import AppRouter from './providers/AppRouter'
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";

function App() {
    return <BreakpointsProvider>
        <AppRouter/>
    </BreakpointsProvider>
}

export default App
