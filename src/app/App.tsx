import {useState} from 'react'
import Authorization from "../pages/authorization";
import AppRouter from '../pages/AppRouter'
import {AuthProvider} from '../contexts/AuthorizationContext'

function App() {

    const [count, setCount] = useState(0)

    return (
        <AuthProvider>
            <AppRouter/>
        </AuthProvider>

    )
}

export default App
