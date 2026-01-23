import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import SongItem from "./SongItem";
import Navbar from "./Navbar";

const AllSongs = () => {
  const { songsData } = useContext(PlayerContext);

  return (
    <>
    <Navbar />
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-5">All Songs</h1>

      <div className="flex flex-col gap-2">
        {songsData.map((song) => (
          <SongItem
            key={song._id}
            id={song._id}
            image={song.image}
            name={song.name}
            desc={song.desc}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default AllSongs;
