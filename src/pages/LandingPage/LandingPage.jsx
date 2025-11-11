import React from 'react'
import Hero from './Hero'
import Features from './Features'
 
import Footer from '../../components/Footer'
import  Moving  from './Moving'

export const LandingPage = () => {
  return (
     <>
     <div className=" text-white font-sans  "  >
      <Hero/>
      <Moving/>
      <Features/>
      
      <Footer/>
    </div>


     </>
  )
}
