import AppRouter from '../pages/AppRouter'
import {AuthProvider} from '../contexts/AuthContext'

function App() {
    return (
        <AuthProvider >
            <AppRouter/>
        </AuthProvider>

    )
}

export default App
