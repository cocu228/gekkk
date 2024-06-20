import { Decimal } from "decimal.js";
//@ts-ignore
// const type = import.meta.VITE_TYPE_PANEL
// eslint-disable-next-line import/extensions
import AppRouter from "@VAR/app/providers/{{MODE}}AppRouter.tsx";

import BreakpointsProvider from "@/app/providers/BreakpointsProvider";

function App() {
  Decimal.set({ toExpNeg: -18 });

  return (
    <BreakpointsProvider>
      <AppRouter />
    </BreakpointsProvider>
  );
}

export default App;
