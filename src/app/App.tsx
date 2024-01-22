import Decimal from "decimal.js";
// import AppRouter from './providers/AppRouter';
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";
import React from "react";
import AppRouter from "@/app/providers/AppRouter";

function App() {
    Decimal.set({toExpNeg: -18});

    return (
        <BreakpointsProvider>
            <AppRouter/>
        </BreakpointsProvider>
    );
}

export default App;
