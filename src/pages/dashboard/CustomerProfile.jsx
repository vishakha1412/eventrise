  import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import DeleteAccountButton from "../../components/DeleteAccountButton";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${SERVER_URL}/api/auth/login/me`, {
          withCredentials: true,
        });
        const data = res.data;
        if (data.authenticated) {
          const customerId = data.userId;
          axios
            .get(`${SERVER_URL}/api/user/${customerId}`, {
              withCredentials: true,
              headers:{
                Authorization:`Bearer ${data.token}`
              }
            })
 .then((res) => {
          setLoading(false);
              console.log("Customer Data:", res.data);
              setUser(res.data);
            })
            .catch((err) =>
              {
                setLoading(false);
                 console.log(err)});
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Profile fetch failed:", err.response?.data || err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center animate-pulse text-purple-700 font-semibold">
        Loading profile...
      </div>
    );
  }
 if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-700">You are not logged in.</p>
        <button
          onClick={() => navigate("/register")}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded hover:scale-105 transform transition duration-300"
        >
          Go to Register
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-lg p-6 border border-purple-200 animate-fade-in">
      <h2 className="text-3xl font-extrabold text-purple-800 mb-6 text-center tracking-wide">
        My Profile
      </h2>
      <div className="space-y-4 text-gray-800 text-lg">
        <p>
          <span className="font-semibold text-purple-700">Name:</span> {user.fullName}
        </p>
        <p>
          <span className="font-semibold text-purple-700">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold text-purple-700">Role:</span> {user.role}
        </p>
      </div>
      <DeleteAccountButton role={user.role}/>
    </div>
);
}

export default UserProfile;
