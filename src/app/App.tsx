import AppRouter from './providers/AppRouter'
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";
// import TabsGroupPrimary from "@/shared/ui/tabs-group/primary";
import "../processes/firebaseConfig"
import Decimal from "decimal.js";

function App() {
    Decimal.set({toExpNeg: -18})
    return <BreakpointsProvider>
        <AppRouter/>
    </BreakpointsProvider>
}



export default App
