 import { useNavigate } from "react-router-dom";
 import { motion } from "framer-motion";
 
 export default function LoginPage() {
   const navigate = useNavigate();
 
   return (
     <motion.div
       className="min-h-screen flex flex-col items-center justify-center   px-4"
         
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ duration: 0.6 }}
     >
       <motion.h1
         className="text-4xl font-bold text-purple-800 mb-8 text-center"
         initial={{ y: -20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.2 }}
       >
         Join EventConnect
       </motion.h1>
       <motion.div
         className="flex flex-col md:flex-row gap-6"
         initial={{ scale: 0.9, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ delay: 0.4 }}
       >
         <button
           onClick={() => navigate("/register/login/user")}
           className="bg-purple-600 text-white px-6 py-4 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 w-64"
         >
           Login as customer
         </button>
         <button
           onClick={() => navigate("/register/login/host")}
           className="bg-purple-600 text-white px-6 py-4 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 w-64"
         >
           Login as Host 
         </button>
          
       </motion.div>
     </motion.div>
   );
 }
 
 