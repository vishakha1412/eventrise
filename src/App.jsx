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
 
import { Logout } from "./pages/register/Logout";
import { BrowsePage } from "./pages/browse/BrowsePage";
import LoginCustomer from "./pages/register/LoginCustomer";
import LoginHost from "./pages/register/LoginHost";
import { CreateEvent } from "./pages/dashboard/CreateEvent.jsx";
import { BusinessProfile } from "./pages/dashboard/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UnderDevelopment from "./components/under-development.jsx";
import { OrganiserDashboard } from "./pages/dashboard/personalProfile.jsx";
 
 

function App() {
 

  return (
     <>
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/services" element={<div className="bg-red-700">Services</div>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/browse" element= {<BrowsePage/>}/>
          <Route path="*" element={<UnderDevelopment/>} />
          <Route path="/register" element={<RegisterRole />} />
         <Route path="/register/customer" element={<RegisterCustomer />} />
         <Route path="/register/host" element={ 
           
              <RegisterHost />
           } />
         <Route path="/dashboard/customer" element={ <ProtectedRoute allowedRole='customer'><CustomerDashboard /></ProtectedRoute>} > </Route>

         <Route path="/dashboard/host" element={<ProtectedRoute allowedRole ='organiser'>
            <HostDashboard />
          </ProtectedRoute>} />
 

          <Route path='/register/login/user' element={<LoginCustomer/>}/>
          <Route path='/register/login/host' element={<LoginHost/>}/>
          <Route path='/create-event' element={<CreateEvent/>}/>
          <Route path='/organiser/:id' element={<BusinessProfile/>}/>
          <Route path='/dashboard/host/profile' element={<OrganiserDashboard/>}/>
          <Route path='/under-development' element={<UnderDevelopment/>}/>
          <Route path='/dashboard/customer/browse' element={<BrowsePage/>}/>
          <Route path='/logout' element={<Logout/>}/>
        </Route>
      </Routes>

     </>
  )
}

export default App
