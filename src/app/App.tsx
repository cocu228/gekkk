import {useState} from 'react'
import Authorization from "../pages/authorization";

function App() {

    const [count, setCount] = useState(0)

    return (
            <Authorization/>
    )
}

export default App
