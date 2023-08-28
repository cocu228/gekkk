import AppRouter from './providers/AppRouter'
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";
import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import "../processes/firebaseConfig"
function App() {

    return <BreakpointsProvider>
        <AppRouter/>
    </BreakpointsProvider>
}

export default App
