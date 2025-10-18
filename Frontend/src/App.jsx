import './App.css'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import Start from './pages/Start'
import GoogleSuccess from './pages/GoogleSuccess'

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<Start />}/>
        <Route path='/Home' element={<Home />} />
        <Route path='/google-success' element={<GoogleSuccess />}/>
      </Routes>
      <Toaster position='top-center'/>    
    </div>
  )
}

export default App