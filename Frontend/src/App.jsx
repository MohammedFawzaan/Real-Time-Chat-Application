import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/UserProtectedWrapper'

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element={<Start />}/>
        <Route path='/Home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
      </Routes>
      <Toaster position='top-center'/>    
    </div>
  )
}

export default App