//@ts-ignore
// const type = import.meta.VITE_TYPE_PANEL
// eslint-disable-next-line import/extensions
import AppRouter from "@VAR/app/providers/{{MODE}}AppRouter.tsx";

import BreakpointsProvider from "@/app/providers/BreakpointsProvider";

function App() {
  console.log(window.navigator);

  return (
    <BreakpointsProvider>
      <AppRouter />
    </BreakpointsProvider>
  );
}

export default App;
