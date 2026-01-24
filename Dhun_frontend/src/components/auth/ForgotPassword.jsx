import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ForgotPassword = () => {
  const navigate = useNavigate();
  const url = "http://localhost:4000";


  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const verifyAnswer = async () => {
  try {
    await axios.post(`${url}/api/auth/forgot-password`, {
      phone,
      securityAnswer: answer,
    });
    setStep(2);
  } catch (err) {
    alert(err.response?.data?.message || "Verification failed");
  }
};

const resetPassword = async () => {
  try {
    await axios.post(`${url}/api/auth/reset-password`, {
      phone,
      newPassword,
    });

    alert("Password reset. Please sign in.");
    navigate("/signin");
  } catch (err) {
    alert(err.response?.data?.message || "Reset failed");
  }
};


  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-[#121212] p-6 rounded-lg w-[320px]">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        {step === 1 && (
          <>
            <p className="text-sm mb-2">
              Security question: <b>Where do you live?</b>
            </p>

            <input
              placeholder="Your answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full mb-3 p-2 rounded bg-[#242424]"
            />

            <button
              onClick={() => setStep(2)}
              className="w-full bg-sky-400 text-sky-950 py-2 rounded"
            >
              Verify
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-3 p-2 rounded bg-[#242424]"
            />

            <button
              onClick={() => {
                alert("Password changed. Please sign in.");
                navigate("/signin");
              }}
              className="w-full bg-sky-400 text-sky-950 py-2 rounded"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
