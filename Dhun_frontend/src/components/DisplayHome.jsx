import React, { useContext } from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {
    const {songsData, albumsData} = useContext(PlayerContext);
    const { searchQuery } = useContext(PlayerContext);

    const normalize = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, " ")   // normalize spaces
    .trim();


    const filteredAlbums = albumsData.filter(album => {
  const query = normalize(searchQuery);

  if (!query) return true;

  return (
    normalize(album.name).includes(query) ||
    normalize(album.desc).includes(query)
  );
});

    return(
    <>
    <Navbar/>
    <div className='mb-4'>
        <h1 className='font-bold my-5 text-2xl'>Featured Albums</h1>
        <div className='flex overflow-auto '>
        {filteredAlbums.map((item,index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))}

        </div>
    </div>
    <div className='mb-4'>
        <h1 className='font-bold my-5 text-2xl'>Today's Biggest Hits</h1>
        <div className='flex overflow-auto '>
            {songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))}

        </div>
    </div>
    </>
  )
}

export default DisplayHome