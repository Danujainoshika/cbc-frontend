

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard.jsx'
import AdminPage from './pages/adminpage.jsx'
import HomePage from './pages/Homepage.jsx'
import Test from './components/test.jsx'
import LoginPage from './pages/loginpage.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  

  return (
    <>
      
      <BrowserRouter>
        <Toaster position="top-right"/>
        <div className='w-full h-[100vh] bg-red-500'>
          <Routes path="/">
            <Route path="/*" element={<HomePage/>}/>
            <Route path ="/login" element={<LoginPage/>}/>
            <Route path='/register' element={<h1>Register Page</h1>}/>
            <Route path='/admin/*' element={<AdminPage/>}/>
            <Route path="/test" element={<Test/>}/>
          </Routes>
        </div>
      </BrowserRouter>
     
      
    </>
  )
}

export default App
