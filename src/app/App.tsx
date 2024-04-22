import Decimal from "decimal.js";
import AppRouter from "@/app/providers/AppRouter";
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";

function App() {
    Decimal.set({ toExpNeg: -18 });

    return (
        <BreakpointsProvider>
            <AppRouter/>
        </BreakpointsProvider>
    );
}

export default App;
