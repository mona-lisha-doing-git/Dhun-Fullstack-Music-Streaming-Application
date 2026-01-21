import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Player = () => {

    const [showSleepMenu, setShowSleepMenu] = useState(false);
    const [targetTime, setTargetTime] = useState("");

    const {
        track,
        seekBar,
        seekBg,
        playStatus,
        play,
        pause,
        time,
        previous,
        next,
        seekSong,
        toggleLyrics,
        toggleQueue,
        volume,
        changeVolume,
        sleepRemaining,
        setSleepTimerMinutes,
        setSleepTimerAtTime,
        clearSleepTimer,
    } = useContext(PlayerContext);


    return track? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
{showSleepMenu && (
  <div className="absolute bottom-20 right-6 bg-[#121212] text-white p-4 rounded-lg shadow-lg w-56 z-50">
    <p className="text-sm mb-2 font-semibold">Sleep Timer</p>

    {/* Minutes-based timer */}
    <div className="flex gap-2 mb-3">
      <button
        onClick={() => {
          setSleepTimerMinutes(10);
          setShowSleepMenu(false);
        }}
        className="px-2 py-1 bg-[#ffffff2b] rounded hover:bg-[#ffffff3b"
      >
        10 min
      </button>

      <button
        onClick={() => {
          setSleepTimerMinutes(30);
          setShowSleepMenu(false);
        }}
        className="px-2 py-1 bg-[#ffffff2b] rounded hover:bg-[#ffffff3b"
      >
        30 min
      </button>

      <button
        onClick={() => {
          setSleepTimerMinutes(60);
          setShowSleepMenu(false);
        }}
        className="px-2 py-1 bg-[#ffffff2b] rounded hover:bg-[#ffffff3b"
      >
        60 min
      </button>
    </div>

    {/* Target time */}
    <div className="flex items-center gap-2">
  <input
    type="time"
    value={targetTime}
    onChange={(e) => setTargetTime(e.target.value)}
    className="flex-1 bg-transparent border border-gray-500 p-2 rounded"
  />

  <button
    onClick={() => {
      if (!targetTime || targetTime.length !== 5) {
        console.log("Invalid time:", targetTime);
        console.log("Setting timer for:", targetTime);
        return;
      }

      setSleepTimerAtTime(targetTime);
      setShowSleepMenu(false);
    }}
    className="px-3 py-2 bg-[#ffffff2b] rounded hover:bg-[#ffffff3b]"
  >
    Set
  </button>
</div>

<button
  onClick={() => {
    clearSleepTimer();
    setShowSleepMenu(false);
  }}
  className="text-xs text-red-400 mt-2"
>
  Cancel Timer
</button>


  </div>
)}

{/* {sleepRemaining !== null && (
  <p className="text-xs text-gray-400 mt-1">
    Stops in{" "}
    {Math.floor(sleepRemaining / 60)
      .toString()
      .padStart(2, "0")}
    :
    {(sleepRemaining % 60).toString().padStart(2, "0")}
  </p>
)} */}


        <div className="hidden lg:flex items-center gap-4">
  {/* Image + timer column */}
  <div className="flex flex-col items-center">
    <img
      className="w-12"
      src={track.image ? track.image : null}
      alt=""
    />

    {sleepRemaining !== null && (
      <p className="text-[11px] text-gray-400 mt-1">
        Stops in{" "}
        {Math.floor(sleepRemaining / 60)
          .toString()
          .padStart(2, "0")}
        :
        {(sleepRemaining % 60).toString().padStart(2, "0")}
      </p>
    )}
  </div>

  {/* Song name + description */}
  <div className="flex flex-col">
    <p className="font-medium">{track.name}</p>
    <p className="text-gray-400 text-sm">
      {track.desc.slice(0, 12)}
    </p>
  </div>
</div>

        <div className='flex flex-col items-center gap-1 m-auto'>
            <div className='flex gap-4'>
                <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
                <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />
                {
                    playStatus?
                    <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="" />
                    :
                    <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" /> 

                }
                <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
                <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="" />

            </div>
            <div className='flex items-center gap-5'>
                <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                    <hr ref={seekBar} className='h-1 border-none w-0 bg-sky-800 rounded-full'/>

                </div>
                <p>{time.totalTime.minute}:{time.totalTime.second}</p>
            </div>

        </div>
        <div className='hidden lg:flex items-center gap-2 opacity-75'>
            <img
                onClick={() => setShowSleepMenu(prev => !prev)}
                className='w-4 cursor-pointer invert brightness-0 hover:opacity-80'
                src={assets.clock_icon}
                alt="Sleep Timer"
            />


            <img
                onClick={toggleLyrics}
                className='w-4 cursor-pointer'
                src={assets.mic_icon}
                alt="Lyrics"
            />

            <img
                onClick={toggleQueue}
                className='w-4 cursor-pointer'
                src={assets.queue_icon}
                alt="Queue"
            />

                {/* Currently not working behavior */}
            <img
              className='w-4 opacity-50 cursor-not-allowed'
              src={assets.speaker_icon}
              alt="Output"
            />

            <img className='w-4' src={assets.volume_icon} alt="" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={changeVolume}
                  className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />

            <img className='w-4' src={assets.mini_player_icon} alt="" />
            <img className='w-4' src={assets.zoom_icon} alt="" />

        </div>
    
    </div>
  )
  : null
}

export default Player