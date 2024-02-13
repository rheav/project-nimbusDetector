import React from "react";
import tagsLogos from "./Logos"; // Make sure the import path is correct

const Chip = ({ logoKey, value }) => {
  // Find the logo source based on the logoKey
  const logoSrc = tagsLogos[logoKey];

  return value ? (
    <div className="m-1 flex items-center bg-white rounded-full px-2 py-1 shadow-sm border border-frost/50 hover:bg-opacity-30 transition duration-200 cursor-pointer ">
      {logoSrc && <img className="w-4 h-4 mr-2" src={logoSrc} alt={logoKey} />}
      <span className="text-xs text-ocean">{value}</span>
    </div>
  ) : null;
};

export default Chip;
