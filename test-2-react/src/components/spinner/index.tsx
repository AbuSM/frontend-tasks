import { type FC } from 'react'

export const Spinner: FC<{ isVisible: boolean; caption?: string }> = ({ isVisible, caption }) => {
    if (!isVisible) return caption || null
    return <span className="loading loading-spinner loading-md"></span>
}
