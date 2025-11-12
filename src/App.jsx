import { NavLink, Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from "./pages/MainLayout";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import RegisterCustomer from "./pages/register/RegisterCustomer";
import RegisterHost from "./pages/register/RegisterHost";
import RegisterRole from "./pages/register/RegisterRole";
import CustomerDashboard from "./pages/dashboard/CustomerDashboard";
import HostDashboard from "./pages/dashboard/HostDashboard";
import Login from "./pages/register/LoginPage";
import About from "./pages/AboutPage";
 
 

function App() {
 

  return (
     <>
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/services" element={<div className="bg-red-700">Services</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/browse" element={<div className="bg-green-700">Browse Vendors</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/register" element={<RegisterRole />} />
         <Route path="/register/customer" element={<RegisterCustomer />} />
         <Route path="/register/host" element={<RegisterHost />} />
         <Route path="/dashboard/customer" element={<CustomerDashboard />} > </Route>
         <Route path="/dashboard/host" element={<HostDashboard />} />

        </Route>
      </Routes>

     </>
  )
}

export default App
