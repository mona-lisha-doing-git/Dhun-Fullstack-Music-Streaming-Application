import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Navbar = () => {

    const { user, logout } = useContext(PlayerContext);

    const navigate = useNavigate()
    return(
    <>
    <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
            <img onClick={()=>navigate(-1)} className='w-8 bg-black rounded-2xl p-2 cursor-pointer hover:bg-[#202120]' src={assets.arrow_left} alt="" />
            <img onClick={()=>navigate(1)} className='w-8 bg-black rounded-2xl p-2 cursor-pointer hover:bg-[#202120]' src={assets.arrow_right} alt="" />

        </div>
        <div className='flex items-center gap-4'>
            <p className='bg-sky-400 text-sky-950 text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-sky-600'>Explore Sleep Help Music</p>
            {!user && (
  <p
    onClick={() => navigate("/signin")}
    className='bg-sky-600 py-1 px-3 rounded-2xl text-[15px] cursor-pointer text-sky-100 hover:bg-sky-800'
  >
    Sign in
  </p>
)}


            <p
  onClick={() => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/signup");
    }
  }}
  className='bg-purple-400 text-sky-950 text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-purple-300'
>
  {user ? user.name : "Profile"}
</p>


        </div>

    </div>
    <div className='flex items-center gap-2 mt-4'>
        <p
  onClick={() => navigate("/")}
  className='bg-sky-400 text-sky-950 px-4 py-1 rounded-2xl cursor-pointer hover:bg-sky-600'
>
  All
</p>

<p
  onClick={() => navigate("/songs")}
  className='bg-sky-600 px-4 py-1 rounded-2xl cursor-pointer text-sky-100 hover:bg-sky-800'
>
  Songs
</p>

<p
  onClick={() => navigate("/albums")}
  className='bg-sky-600 px-4 py-1 rounded-2xl cursor-pointer text-sky-100 hover:bg-sky-800'
>
  Albums
</p>


    </div>
    
    </>
  )
}

export default Navbar