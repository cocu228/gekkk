import Decimal from "decimal.js";
// import AppRouter from './providers/AppRouter';
import BreakpointsProvider from "@/app/providers/BreakpointsProvider";
//import React, { useEffect } from "react";
import AppRouter from "@/app/providers/AppRouter";

function App() {
    Decimal.set({toExpNeg: -18});

    // Hide loading logo form
    // useEffect(() => {        
    //     const externalForm = document.getElementById('logoC');
    //     if (externalForm) {
    //       externalForm.style.display = 'none';
    //     }
    //   }, []);

    return (
        <BreakpointsProvider>
            <AppRouter/>
        </BreakpointsProvider>
    );
}

export default App;
