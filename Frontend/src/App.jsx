import './App.css'
import Home from './pages/Home'
import Start from './pages/Start'
import { Routes, Route } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import GoogleSucess from './pages/GoogleSucess'

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/google-success' element={<GoogleSucess />}/>
      </Routes>
      <Toaster position='top-center'/>    
    </div>
  )
}

export default App