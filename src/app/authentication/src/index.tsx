import {render} from 'preact'
// import {Auth} from './pages/Auth'
import './app/styles/flexboxgrid.min.css'
import './app/styles/index.scss'
import './styles/index.css';
import {_Auth} from "./pages/_Auth";


render(<_Auth/>, document.getElementById('root')!)
