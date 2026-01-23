import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ image, name, desc, id }) => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div
      onClick={() => playWithId(id)}
      className="flex items-center gap-4 p-2 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <div className="w-12 flex flex-col items-center">
        {/* Image */}
        <div className="w-12 h-12 overflow-hidden rounded">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

      </div>

      {/* Text locked to image width */}
      <div className="w-40">
        <p className="font-medium truncate">{name}</p>
        <p className="text-sm text-slate-400 truncate">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default SongItem;
