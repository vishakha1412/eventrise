import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarAlt, FaRocket } from 'react-icons/fa';

const features = [
  {
    icon: <FaUsers />,
    title: 'Community Exposure',
    description: 'Give small entrepreneurs a platform to shine.',
  },
  {
    icon: <FaCalendarAlt />,
    title: 'Event Management',
    description: 'Organize and showcase events with ease.',
  },
  {
    icon: <FaRocket />,
    title: 'Customer Discovery',
    description: 'Help customers find the best fit for their needs.',
  },
];
const Features = () => {
  return (
    <section id="features" className="py-20 px-6 text-center">
      <h2 className="text-4xl font-bold mb-12">Why Choose Us</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white text-purple-700 p-6 rounded-xl shadow-lg"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;




    