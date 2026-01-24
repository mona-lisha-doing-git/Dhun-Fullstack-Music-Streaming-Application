import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const url = "http://localhost:4000";


  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSignUp = async (e) => {
  e.preventDefault();

  try {
    await axios.post(`${url}/api/auth/signup`, {
      name,
      phone,
      password,
      securityAnswer: answer,
    });

    alert("Account created. Please sign in.");
    navigate("/signin");
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <div className="h-full flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="bg-[#121212] p-6 rounded-lg w-[320px]"
      >
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 p-2 rounded bg-[#242424]"
        />

        <input
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-2 p-2 rounded bg-[#242424]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-2 p-2 rounded bg-[#242424]"
        />

        <p className="text-sm text-gray-400 mb-1">
          Security question: <b>Where do you live?</b>
        </p>

        <input
          placeholder="Your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-[#242424]"
        />

        <button className="w-full bg-sky-400 text-sky-950 py-2 rounded font-semibold hover:bg-sky-600">
          Create Account
        </button>
        <p className="text-sm mt-3 text-center">
  Already have an account?{" "}
  <span
    onClick={() => navigate("/signin")}
    className="text-sky-400 cursor-pointer hover:underline"
  >
    Sign in
  </span>
</p>

      </form>
    </div>
  );
};

export default SignUp;
