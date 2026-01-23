import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="min-w-[180px] p-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <div className="w-[160px] mx-auto">
        {/* Image */}
        <div className="w-[160px] h-[160px] overflow-hidden rounded-lg">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <p className="font-bold mt-2 truncate">{name}</p>
        <p className="text-slate-200 text-sm line-clamp-2">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default AlbumItem;
