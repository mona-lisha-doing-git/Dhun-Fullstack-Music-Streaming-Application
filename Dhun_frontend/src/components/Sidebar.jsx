import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const Sidebar = () => {
  const { setSearchQuery } = useContext(PlayerContext);
  const { user } = useContext(PlayerContext);


  const navigate = useNavigate();
    return(
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
      <div className='bg-[#121212] h-[10%] rounded flex flex-col justify-around hover:bg-[#202120]'>
       
        <div onClick={()=>{navigate('/')}} className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img className="w-6" src={assets.home_icon} alt="" />
          <p className='font-bold'>Home</p>
      </div>
        </div>

        <div className='bg-[#121212] rounded p-4'>
  <div className='flex items-center gap-3 mb-3'>
    <img className="w-6" src={assets.search_icon} alt="" />
    <p className='font-bold'>Search</p>
  </div>

  <div className="flex items-center bg-[#242424] rounded px-3 py-2">
    <input
  type="text"
  placeholder="Search songs or albums"
  onChange={(e) => setSearchQuery(e.target.value)}
  className="bg-transparent outline-none text-sm w-full text-white placeholder-gray-400"
/>

  </div>
</div>


      <div className='bg-[#121212] h-[85%] rounded'>
        <div className='p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img className='w-8' src={assets.dhun_logo} alt="" />
            <p className='font-semibold'>Your Library</p>

          </div>
          <div className='flex items-center gap-3'>
            <img className='w-5' src={assets.arrow_icon} alt="" />
            <img className='w-5' src={assets.plus_icon} alt="" />

          </div>

        </div>
        <div className='p-4 bg-[#242424] m-2 rounded font-semibold m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
          <h1>Create your first playlist</h1>
          <p className='font-light'>It is easy we'll help you</p>
          {!user ? (
              <button className='px-4 py-1.5 bg-sky-400 text-[15px] text-sky-950 rounded-full mt-4 cursor-not-allowed opacity-60'>
                Create Playlist
              </button>
            ) : (
              <button
                onClick={() => navigate("/create-album")}
                className='px-4 py-1.5 bg-sky-400 text-[15px] text-sky-950 rounded-full mt-4 cursor-pointer hover:bg-sky-600'
              >
                Create Playlist
              </button>
            )}


        </div>
        {/* <div className='p-4 bg-[#242424] m-2 rounded font-semibold m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4'>
          <h1>Let's find some podcast to follow</h1>
          <p className='font-light'>We'll keep you updated on new episodes</p>
          <button className='px-4 py-1.5 bg-sky-400 text-[15px] text-sky-950 rounded-full mt-4 cursor-pointer'>Browse Podcast</button>

        </div> */}

      </div>
    
    </div>
  )
}

export default Sidebar