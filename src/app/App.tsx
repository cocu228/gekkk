import Decimal from "decimal.js";
import "../processes/firebaseConfig";
import AppRouter from './providers/AppRouter';

import BreakpointsProvider from "@/app/providers/BreakpointsProvider";

function App() {
    Decimal.set({toExpNeg: -18});
    console.log('(1) App')
    
    return (
        <BreakpointsProvider>
            <AppRouter/>
            
        </BreakpointsProvider>
    );
}

export default App;
