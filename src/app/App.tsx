import AppRouter from './providers/AppRouter'
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";
import {AuthProvider} from "@/app/providers/AuthRouter";

function App() {
    return <BreakpointsProvider>
        <AppRouter/>
    </BreakpointsProvider>
}

export default App
