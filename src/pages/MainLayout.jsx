import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { LandingPage } from './LandingPage/LandingPage';

export default function MainLayout() {
  return (
    <><div  style={{backgroundImage: "url('/assets/main-bg.jpg')"}} className="bg-cover bg-fixed bg-center min-h-screen">
      <Navbar className='bg-purple-900/70 ' />
      <main className="pt-16 min-h-screen  ">
        
        <Outlet />
      </main>
      </div>
    </>
  );
}
