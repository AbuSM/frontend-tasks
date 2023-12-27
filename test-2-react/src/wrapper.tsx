import { useEffect, useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { LoginPage, Step2 } from './pages'
import { Header } from './components'
import { AlertContext } from './context'

export const Wrapper = () => {
    const alertContext = useContext(AlertContext)

    useEffect(() => {
        const handleBackButton = () => {
            if (alertContext.alert) {
                window.history.go(1)
            }
        }
        window.addEventListener('popstate', handleBackButton)
        return () => window.removeEventListener('popstate', handleBackButton)
    }, [alertContext])
    return (
        <>
            <Header />
            <main className="h-full">
                <Switch>
                    <Route component={LoginPage} path="/login/step-1" exact></Route>
                    <Route component={Step2} path="/login/step-2" exact={true}></Route>
                    <Route>Not implemented</Route>
                </Switch>
                <Redirect from="/" exact to="/login/step-1" />
            </main>
        </>
    )
}
