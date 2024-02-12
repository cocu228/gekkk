import {render} from 'preact'
import './styles/index.css';
import BreakpointsProvider from "./app/providers/BreakpointsProvider";
import Auth from "./pages/auth";


render(<BreakpointsProvider>
	<Auth/>
</BreakpointsProvider>, document.getElementById('root')!)
