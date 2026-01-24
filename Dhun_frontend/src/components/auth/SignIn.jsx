import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../../context/PlayerContext";
import axios from "axios";


const SignIn = () => {

    
    const navigate = useNavigate();
    const { login } = useContext(PlayerContext);
    const url = "http://localhost:4000";

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(`${url}/api/auth/login`, {
      phone,
      password,
    });

    login(res.data.user);   
    navigate("/");          
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};



  return (
    <div className="h-full flex items-center justify-center">
      <form
        onSubmit={handleSignIn}
        className="bg-[#121212] p-6 rounded-lg w-[320px]"
      >
        <h2 className="text-xl font-bold mb-4">Sign In</h2>

        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-[#242424] outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-[#242424] outline-none"
        />

        <button
          type="submit"
          className="w-full bg-sky-400 text-sky-950 py-2 rounded font-semibold hover:bg-sky-600"
        >
          Sign In
        </button>

        <p
          onClick={() => navigate("/forgot-password")}
          className="text-sm text-sky-400 mt-3 cursor-pointer"
        >
          Forgot password?
        </p>

        <p className="text-sm mt-2">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-sky-400 cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
