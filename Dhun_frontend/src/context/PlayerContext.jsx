import { createContext, useEffect, useRef, useState } from "react"
import axios from "axios"

export const PlayerContext = createContext();

const PlayerContextProvider = (props)=>{

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const sleepIntervalRef = useRef(null);
    const sleepTimerRef = useRef(null);
    
    const url = 'http://localhost:4000';

    const [searchQuery, setSearchQuery] = useState("");
    
    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time,setTime] = useState({
        currentTime:{
            second: 0,
            minute: 0
        },
        totalTime:{
            second: 0,
            minute: 0
        }
    })

    const [sleepTimerId, setSleepTimerId] = useState(null);
    const [sleepTimerMode, setSleepTimerMode] = useState(null); // "minutes" | "time"
    const [sleepRemaining, setSleepRemaining] = useState(null); // seconds


    
    const [volume, setVolume] = useState(1);
    const [showLyrics, setShowLyrics] = useState(false);
    const [showQueue, setShowQueue] = useState(false);

    const [user, setUser] = useState(null);

    const login = (userData) => {
      setUser(userData);
    };
    
    const logout = () => {
      setUser(null);
    };


    const play = ()=>{
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = ()=>{
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id)=>{
        await songsData.map((item)=>{
            if(id === item._id){
                setTrack(item);
            }
        })
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previous = async ()=>{
        songsData.map(async (item, index)=>{
            if(track._id === item._id && index > 0){
                await setTrack(songsData[index-1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }
    const next = async ()=>{
        songsData.map(async (item, index)=>{
            if(track._id === item._id && index < songsData.length-1){
                await setTrack(songsData[index+1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    const seekSong = async (e)=>{
        // console.log(e); // console: event -> native event -> offsetX
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    }

    const getSongsData = async ()=>{
        try{
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]);
        }catch(error){

        }
    }

    const getAlbumsData = async ()=>{
        try{

            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);

        }catch(error){

        }
    }

    const toggleLyrics = () => {
    setShowLyrics(prev => !prev);
    };

    const toggleQueue = () => {
        setShowQueue(prev => !prev);
    };

    const changeVolume = (e) => {
        const value = e.target.value;
        audioRef.current.volume = value;
        setVolume(value);
    };

    const clearSleepTimer = () => {
  if (sleepTimerId) {
    clearTimeout(sleepTimerId);
  }

  if (sleepIntervalRef.current) {
    clearInterval(sleepIntervalRef.current);
    sleepIntervalRef.current = null;
  }

  setSleepTimerId(null);
  setSleepRemaining(null);
};

    const stopPlayback = () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayStatus(false);
    };

    const setSleepTimerMinutes = (minutes) => {
      clearSleepTimer();

      const endTime = Date.now() + minutes * 60 * 1000;

      const timer = setTimeout(() => {
        stopPlayback();
        setSleepRemaining(null);
      }, minutes * 60 * 1000);

      setSleepTimerId(timer);
      setSleepTimerMode("minutes");
      startSleepCountdown(endTime);
    };


        const setSleepTimerAtTime = (timeString) => {
  if (!timeString || !timeString.includes(":")) return;

  clearSleepTimer();

  const now = new Date();

  const [hStr, mStr] = timeString.split(":");
  const hours = Number(hStr);
  const minutes = Number(mStr);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) return;

  const target = new Date();
  target.setHours(hours, minutes, 0, 0);

  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  const delay = target.getTime() - now.getTime();

  if (delay <= 0) return;

  sleepTimerRef.current = setTimeout(() => {
    stopPlayback();
    clearSleepTimer();
  }, delay);

  startSleepCountdown(target.getTime());
};



const startSleepCountdown = (endTime) => {
  if (sleepIntervalRef.current) {
    clearInterval(sleepIntervalRef.current);
  }

  sleepIntervalRef.current = setInterval(() => {
    const diff = Math.max(
      Math.floor((endTime - Date.now()) / 1000),
      0
    );

    setSleepRemaining(diff);

    if (diff === 0) {
      clearInterval(sleepIntervalRef.current);
      sleepIntervalRef.current = null;
      setSleepRemaining(null);
    }
  }, 1000);
};

    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate = ()=>{
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration * 100))+ "%";
                setTime({
                    currentTime:{
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime:{
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000)
    }, [audioRef])

    useEffect(()=>{
        getSongsData();
        getAlbumsData();
    }, []);
    
    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        songsData, albumsData,
        volume,
        changeVolume,
        showLyrics,
        toggleLyrics,
        showQueue,
        toggleQueue,
        setSleepTimerMinutes,
        setSleepTimerAtTime,
        clearSleepTimer,
        sleepTimerMode,
        sleepRemaining,
        searchQuery,
        setSearchQuery,
        user,
        login,
        logout,

    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}

        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;