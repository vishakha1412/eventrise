import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import './Hero.css';
import {Sparkles, ArrowRight} from 'lucide-react';



 

const Hero = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center text-center px-6 " 
     style={{backgroundImage: "url('/assets/hero-bg.jpg')"}}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl"
      >
         <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center pt-16">
            
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 animate-fade-in leading-tight">
              Create Your
              <span className="block text-gradient">Perfect Celebration</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in">
              Connect with top-rated decorators, caterers, and event professionals. Plan your dream wedding, birthday, or special occasion with trusted local vendors.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/browse">
                <button size="lg" className="gradient-festive text-white shadow-celebration hover:shadow-glow transition-all px-8 group">
                  Browse Vendors
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
            </div>
          </div>
        </div>
        <Link to="features" smooth duration={500}>
          <button className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-full hover:bg-purple-100 transition">
            Explore Features
          </button>
        </Link>
        
      </motion.div>
         

    </div>
    
 );
};

export default Hero;
