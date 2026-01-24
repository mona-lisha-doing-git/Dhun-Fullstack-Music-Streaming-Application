import React, { useContext } from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {
    const {songsData, albumsData} = useContext(PlayerContext);
    const { searchQuery } = useContext(PlayerContext);

    const { user } = useContext(PlayerContext);

const userPlaylists = user
  ? albumsData.filter((album) => album.user === user.id)
  : [];


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

    {/* USER PLAYLISTS */}
{user && (
  <div className="mt-10">
    <h1 className="text-2xl font-bold mb-4">
        <h1 className="text-2xl font-bold mb-4">
        {user.name}'s Playlists
</h1>

    </h1>

    {userPlaylists.length === 0 ? (
      <p className="text-gray-400">No Playlist Created</p>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {userPlaylists.map((playlist) => (
          <AlbumItem
            key={playlist._id}
            id={playlist._id}
            image={playlist.image}
            name={playlist.name}
            desc={playlist.desc}
          />
        ))}
      </div>
    )}
  </div>
)}

    </>
  )
}

export default DisplayHome