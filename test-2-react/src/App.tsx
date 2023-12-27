import { BrowserRouter } from 'react-router-dom'
import { AlertProvider } from './context'
import { Wrapper } from './wrapper'

export default function App() {
    return (
        <BrowserRouter>
            <AlertProvider>
                <Wrapper />
            </AlertProvider>
        </BrowserRouter>
    )
}
