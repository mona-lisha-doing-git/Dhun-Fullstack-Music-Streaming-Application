import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import AlbumItem from "./AlbumItem";
import Navbar from "./Navbar";

const AllAlbums = () => {
  const { albumsData } = useContext(PlayerContext);

  return (
    <>
    <Navbar/>
    <div className="mt-5">
      <h1 className="text-2xl font-bold mb-4">All Albums</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {albumsData.map((album) => (
          <AlbumItem
            key={album._id}
            id={album._id}
            image={album.image}
            name={album.name}
            desc={album.desc}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default AllAlbums;
