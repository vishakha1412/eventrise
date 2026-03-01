 import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { Toaster } from "react-hot-toast";

export const Logout = () => {
  const navigate = useNavigate();
  const[loading,setLoading]=useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
    setLoading(true);
 axios
      .get(`${SERVER_URL}/api/auth/logout`, {withCredentials:true}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("token");
        setLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        console.error("Logout failed:", err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
    if(loading){
    return <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-center" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8   p-8 rounded-lg shadow-md"
      >
        <h2 className="text-center text-8xl  animate-pulse font-extrabold text-gray-900">
         🥳...
        </h2>
      </motion.div>
    </div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 text-purple-800">
      <p className="text-lg font-semibold">Logging you out...</p>
    </div>
  );
};


