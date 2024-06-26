import Decimal from "decimal.js";
//@ts-ignore
// const type = import.meta.VITE_TYPE_PANEL
import AppRouter from "@VAR/app/providers/{{MODE}}AppRouter.tsx";
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";

function App() {
    Decimal.set({toExpNeg: -18});

    console.log(window.navigator)

    return (
        <BreakpointsProvider>
            <AppRouter/>
        </BreakpointsProvider>
    );
}

export default App;
