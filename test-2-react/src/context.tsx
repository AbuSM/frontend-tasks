import { createContext, useState, type FC, type ReactNode } from 'react'

interface ContextProps {
    setAlert: (value: boolean) => void
    alert: boolean
    setPopState: (value: boolean) => void
    popState: boolean
}

export const AlertContext = createContext<ContextProps>({
    setAlert: () => {},
    alert: false,
    popState: false,
    setPopState: () => {},
})

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState({ alert: false, popState: false })
    const setAlert = (value: boolean) => {
        setState((prev) => ({ ...prev, alert: value }))
    }

    const setPopState = (value: boolean) => {
        setState((prev) => ({ ...prev, popState: value }))
    }

    return <AlertContext.Provider value={{ setAlert, setPopState, ...state }}>{children}</AlertContext.Provider>
}
