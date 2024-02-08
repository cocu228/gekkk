import {render} from 'preact'
import './app/styles/flexboxgrid.min.css'
import './app/styles/index.scss'
import './styles/index.css';
import BreakpointsProvider from "./app/providers/BreakpointsProvider";
import Auth from "./pages/auth";
//import {_Auth} from "./pages/_Auth";


render(<BreakpointsProvider>
	<Auth/>
</BreakpointsProvider>, document.getElementById('root')!)
