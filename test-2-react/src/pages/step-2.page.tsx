import { SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react'
import { StorageService, ApiService } from '../service'
import { VALID_EMAIL } from '../constants'
import { useHistory } from 'react-router'
import { Alert, Spinner } from '../components'
import { AlertContext } from '../context'

export const Step2 = (props: { email: string }) => {
    const [state, setState] = useState({ isAlertOpen: false, type: 'success', caption: '', loading: false })
    const alert = useContext(AlertContext)

    useEffect(() => {
        alert.setAlert(state.isAlertOpen)
    }, [state.isAlertOpen])

    const EMAIL = useMemo(() => StorageService.getItem(VALID_EMAIL), [])

    const history = useHistory()

    const onSuccess = () => {
        setState((prev) => ({ ...prev, type: 'success', isAlertOpen: true, caption: 'Success!' }))
        alert.setAlert(true)
    }

    const onFail = () => {
        setState((prev) => ({ ...prev, type: 'error', isAlertOpen: true, caption: 'Error!' }))
        alert.setAlert(true)
    }

    const handleBack = () => {
        history.goBack()
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        setState((prev) => ({ ...prev, loading: true }))
        ApiService.post('endpoint', { email: EMAIL })
            .then((res) => {
                if (res.status === 200) {
                    onSuccess()
                } else {
                    onFail()
                }
            })
            .catch((err) => {
                console.error(err)
                onFail()
            })
            .finally(() => {
                setState((prev) => ({ ...prev, loading: false }))
            })
    }

    return (
        <form className="flex flex-col p-4 h-full" onSubmit={handleSubmit}>
            <label className="form-control">
                <div className="label">
                    <span className="label-text">Email</span>
                </div>
                <input
                    type="email"
                    defaultValue={EMAIL || props?.email}
                    placeholder="Type here"
                    name="email"
                    className="input"
                    required
                    disabled
                />
            </label>
            <div className="flex gap-2 mt-auto w-full">
                <button className="btn flex-grow" onClick={handleBack}>
                    Back
                </button>
                <button className="btn btn-primary flex-grow" type="submit">
                    <Spinner isVisible={state.loading} caption="Confirm" />
                </button>
            </div>
            <Alert
                isOpen={state.isAlertOpen}
                type={state.type}
                caption={state.caption}
                onClose={() => setState((prev) => ({ ...prev, isAlertOpen: false }))}
            />
        </form>
    )
}
