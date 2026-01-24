import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import AlbumItem from "./AlbumItem";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, albumsData, logout } = useContext(PlayerContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/signup");
    return null;
  }

  const userAlbums = albumsData.filter(
    (album) => album.user === user.id
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {/* User Info */}
      <div className="mb-6">
        <p className="text-lg"><b>Name:</b> {user.name}</p>
        <p className="text-lg"><b>Phone:</b> {user.phone}</p>
      </div>

      {/* User Albums */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Your Albums</h2>

        {userAlbums.length === 0 ? (
          <p className="text-gray-400">
            You haven’t created any albums yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {userAlbums.map((album) => (
              <AlbumItem
                key={album._id}
                id={album._id}
                image={album.image}
                name={album.name}
                desc={album.desc}
              />
            ))}
          </div>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;