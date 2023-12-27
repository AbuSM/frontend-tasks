import { useState, SyntheticEvent, useMemo, useEffect, useCallback } from 'react'
import { EMAIL_REGEX, VALID_EMAIL, TIMEOUT_DURATION } from '../constants'
import { StorageService } from '../service'
import { useHistory } from 'react-router'

const initialState = {
    email: '',
    isChecked: false,
    submitStartTime: 0,
    timeElapsed: 0,
    intervalId: 0,
}

export const LoginPage = () => {
    const [state, setState] = useState<typeof initialState>(initialState)
    const history = useHistory()

    useEffect(() => {
        const validEmail = StorageService.getItem(VALID_EMAIL)
        if (validEmail) {
            setState((prev) => ({ ...prev, email: validEmail }))
        }
    }, [])

    useEffect(() => {
        if (!!state.submitStartTime) {
            const intervalId = setInterval(() => {
                setState((prev) => ({ ...prev, timeElapsed: performance.now() - state.submitStartTime }))
            }, TIMEOUT_DURATION)
            setState((prev) => ({ ...prev, intervalId } as any))
            return () => clearInterval(intervalId)
        }
    }, [state.submitStartTime])

    const handleChange = (event: SyntheticEvent) => {
        event.persist()
        const { value, name, checked } = (event?.target as HTMLInputElement) || {}
        if (name === 'isChecked') {
            setState((prev) => ({ ...prev, isChecked: checked }))
        } else {
            setState((prev) => ({ ...prev, [name]: value }))
        }
    }

    const handleClickStart = (event: SyntheticEvent) => {
        event.preventDefault()
        setState((prev) => ({ ...prev, submitStartTime: performance.now() }))
    }

    const handleResetInterval = useCallback(() => {
        clearInterval(state.intervalId)
        setState((prev) => ({ ...prev, timeElapsed: 0, submitStartTime: 0, intervalId: 0 }))
    }, [state.intervalId])

    const handleSubmit = useCallback(() => {
        if (performance.now() - state.submitStartTime >= TIMEOUT_DURATION) {
            history.push('/login/step-2')
        }
        handleResetInterval()
    }, [handleResetInterval])

    const isValid = useMemo(() => {
        const emailIsValid = EMAIL_REGEX.test(state.email)
        if (emailIsValid) {
            StorageService.setItem(VALID_EMAIL, state.email)
        }
        return !!state.email && !!state.isChecked && emailIsValid
    }, [state.email, state.isChecked])

    return (
        <form onSubmit={(event) => event.preventDefault()} className="flex flex-col p-4 h-full">
            <label className="form-control">
                <div className="label">
                    <span className="label-text">Email</span>
                </div>
                <input
                    type="email"
                    placeholder="Type here"
                    name="email"
                    className="input"
                    onChange={handleChange}
                    required
                    defaultValue={state.email}
                />
                {/* <div className="label">
                    <span className="label-text-alt">{ error}</span>
                </div> */}
            </label>
            <div className="p-1"></div>
            <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                    <input
                        type="checkbox"
                        name="isChecked"
                        onChange={handleChange}
                        className="checkbox checkbox-primary"
                    />
                    <span className="label-text">I agree</span>
                </label>
            </div>
            <button
                className="btn btn-primary mt-auto"
                type="submit"
                onMouseOut={() => handleResetInterval()}
                onMouseLeave={() => handleResetInterval()}
                onTouchStart={handleClickStart}
                onMouseDown={handleClickStart}
                onMouseUp={handleSubmit}
                onTouchEnd={handleSubmit}
                disabled={!isValid}
            >
                Hold to proceed {!!state.submitStartTime && (state.timeElapsed / 1000).toFixed(2)}
            </button>
        </form>
    )
}
