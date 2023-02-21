import {useState} from 'react'
import Authorization from "../pages/authorization";

function App() {

    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <Authorization/>
        </div>
    )
}

export default App
