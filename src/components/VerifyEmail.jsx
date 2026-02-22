import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const status = params.get("status");
  const navigate = useNavigate();
  const[loading,setLoading]=useState(false);
  useEffect(() => {
    setLoading(true);
    if (status === "success") {
      toast.success("Email verified. You can log in now.");
      setLoading(false);
      setTimeout(() => navigate("/login"), 3000);
    } else if (status === "already") {
      toast.info("Email already verified.");
      setLoading(false);
      setTimeout(() => navigate("/login"), 3000);
    } else if (status === "invalid") {
      toast.error("Verification link is invalid or expired.");
    }
  }, [status]);
  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-center">
          <p className="text-lg text-gray-700">Verifying your email...</p>
        </div>
      </div>
    );
  }

 return (

    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">EventConnect</h1>
        <p className="text-lg text-gray-700">Processing verification...</p>
      </div>
    </div>
  );
}

