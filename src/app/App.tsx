import AppRouter from './providers/AppRouter'
import {AuthProvider} from '../processes/auth/model/AuthContext'

function App() {
    return (
        <AuthProvider >
            <AppRouter/>
        </AuthProvider>

    )
}

export default App
