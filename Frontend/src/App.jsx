import './App.css'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/'/>
      <Route path='/Home' element={<Home/>}/>
    </Routes>
  )
}

export default App