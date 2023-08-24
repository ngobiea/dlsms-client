import React from "react";

const MiniClassRoomCard = ({ title, classes }) => {
  const mediumClass =
    classes === "medium"
      ? "bg-green-500 shadow-lg w-24 h-24 ml-3 rounded-sm justify-center items-center flex"
      : "bg-green-500 shadow-lg w-8 h-8 rounded-sm justify-center items-center flex";
    const mediumClassText =
      classes === "medium" ? "text-2xl text-white" : "text-xs text-white";
  return (
    <div className={mediumClass}>
      <h1 className={mediumClassText}>{title}</h1>
    </div>
  );
};

export default MiniClassRoomCard;
