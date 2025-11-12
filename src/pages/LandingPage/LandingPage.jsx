import React from 'react'
import Hero from './Hero'
import Features from './Features'
 
import Footer from '../../components/Footer'
import  Moving  from './Moving'
import About from '../AboutPage'

export const LandingPage = () => {
  return (
     <>
     <div className=" text-white font-sans  "  >
      <Hero/>
      <Moving/>
      <About/>
      <Features/>
      
      <Footer/>
    </div>


     </>
  )
}
