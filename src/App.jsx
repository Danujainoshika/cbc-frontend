

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard.jsx'
import AdminPage from './pages/adminpage.jsx'
import HomePage from './pages/Homepage.jsx'
import Test from './components/test.jsx'
import LoginPage from './pages/loginpage.jsx'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/registerpage.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  

  return (
    <>
      
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className='w-full h-[100vh] bg-red-500'>
          <Toaster position="top-right"/>
          <Routes path="/">
            <Route path="/*" element={<HomePage/>}/>
            <Route path ="/login" element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/admin/*' element={<AdminPage/>}/>
            <Route path="/test" element={<Test/>}/>
          </Routes>
        </div>
        </GoogleOAuthProvider>
      </BrowserRouter>
     
      
    </>
  )
}

export default App
