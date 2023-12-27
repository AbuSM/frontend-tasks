import { type FC, useEffect, useMemo } from 'react'

interface AlertProps {
    isOpen: boolean
    type: string
    caption: string
    onClose: () => void
}

export const Alert: FC<AlertProps> = ({ isOpen, type, caption, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => onClose?.(), 10000)
        }
    }, [isOpen, onClose])
    const { typeClass, typeComponent } = useMemo(() => {
        switch (type) {
            case 'error':
                return {
                    typeClass: 'alert-error',
                    typeComponent: (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    ),
                }
            case 'success':
                return {
                    typeClass: 'alert-success',
                    typeComponent: (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    ),
                }
            default:
                return { typeClass: 'alert-warning', typeComponent: null }
        }
    }, [type])

    if (!isOpen) return null

    return (
        <div role="alert" className={`alert ${typeClass}`}>
            {typeComponent}
            <span>{caption}</span>
        </div>
    )
}
