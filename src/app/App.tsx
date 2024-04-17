import Decimal from "decimal.js";
//@ts-ignore
import AppRouter from "@VAR/app/providers/{{MODE}}AppRouter.tsx";
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";

function App() {
    Decimal.set({toExpNeg: -18});

    return (
        <BreakpointsProvider>
            <AppRouter/>
        </BreakpointsProvider>
    );
}

export default App;
