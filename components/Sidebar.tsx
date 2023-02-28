import React from "react";

const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col">
      <div className="xl:ml-10 hoverAnimation">
        <img
          src="https://icon-library.com/images/twitter-icon-svg/twitter-icon-svg-28.jpg"
          alt=""
          className="h-8 w-8"
        />
      </div>
      <div className="text-[#d9d9d9] xl:ml-10"></div>
    </div>
  );
};

export default Sidebar;
