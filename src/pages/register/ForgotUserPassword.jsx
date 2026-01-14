import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import zxcvbn from 'zxcvbn';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [passwordScore, setPasswordScore] = useState(0);
    const navigate = useNavigate();

  useEffect(() => {
    const timer = cooldown > 0 && setInterval(() => setCooldown(cooldown - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    setPasswordScore(zxcvbn(newPassword).score);
  }, [newPassword]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
try {
      await axios.post('http://localhost:5000/api/auth/user/request-password-reset', { email });
      
      toast.success('OTP sent to your email');
      setStep(2);
      setCooldown(60);  
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP');
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp.trim()) return toast.error('Please enter the OTP');
    setStep(3);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/user/reset-password', { email, otp, newPassword });
      toast.success('Password reset successful');
      setStep(1);
      setEmail('');
      setOtp('');
      setNewPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error resetting password');
    }
  };
const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-emerald-500'];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Toaster position="top-center" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-purple-50/80 p-8 rounded-lg shadow-md"
      >
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Forgot Your Password?
        </h2>
        <p className="text-center text-sm text-gray-600">
          {step === 1 && "Enter your email to receive an OTP."}
          {step === 2 && "Enter the OTP sent to your email."}
          {step === 3 && "Enter your new password."}
        </p>
 {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              type="submit"
              disabled={cooldown > 0}
              className={`w-full py-2 px-4 text-white rounded-md ${
                cooldown > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : 'Send OTP'}
            </button>
            <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full mt-2  text-purple-700  rounded hover:bg-gray-300 transition"
        >
          Back to Register PAGE
        </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
required
              className="w-full px-3 py-2 border rounded-md"
            />
            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md">
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <div className="w-full h-2 rounded bg-gray-200 mt-1">
              <div className={`h-2 rounded ${strengthColors[passwordScore]}`} style={{ width: `${(passwordScore + 1) * 20}%` }}></div>
            </div>
            <p className="text-sm text-gray-600 text-right">{strengthLabels[passwordScore]}</p>
            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md">
              Reset Password
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

