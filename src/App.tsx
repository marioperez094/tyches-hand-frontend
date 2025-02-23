import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from "react-router";

function App() {
  const [count, setCount] = useState(0)
  const [boolean, setBoolean] = useState(true)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-red-500">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Link onClick={ () => setBoolean(prev => !prev) } to={ boolean ? "/hello" : "/" }>Button</Link>

      <Routes>
        <Route path="/" element={ <div>Hi</div> } />
        <Route path="/hello" element={ <div>Hello</div> } />
      </Routes>
    </>
  )
}

export default App
