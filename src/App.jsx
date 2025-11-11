import { NavLink, Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from "./pages/MainLayout";
import { LandingPage } from "./pages/LandingPage/LandingPage";
 

function App() {
 

  return (
     <>
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage/>} />
          <Route path="about" element={<div>About</div>} />
          <Route path="services" element={<div className="bg-red-700">Services</div>} />
          <Route path="contact" element={<div>Contact</div>} />
        </Route>
      </Routes>

     </>
  )
}

export default App
