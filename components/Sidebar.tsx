import React from "react";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col xl:w-[140px]  items-start pt-2 fixed xl:ml-12">
      <div className="hoverAnimation p-3">
        <img
          src="https://icon-library.com/images/twitter-icon-svg/twitter-icon-svg-28.jpg"
          alt=""
          className="h-8 w-8"
        />
      </div>
      <div className="text-[#d9d9d9]  flex flex-col mt-4 items-start justify-center">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} active />
        <SidebarLink text="Notificatons" Icon={BellIcon} active />
        <SidebarLink text="Messages" Icon={InboxIcon} active />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} active />
        <SidebarLink text="Lists" Icon={ClipboardDocumentListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} />
      </div>
      <div className="">
        <button
          className="hidden xl:flex bg-[#1d9bf0] hover:bg-[#1a8cd8] w-[210px] h-[52px]
        justify-center items-center rounded-full mt-3 text-white text-xl"
        >
          Tweet
        </button>
        {/* user info */}
        <div className="text-white mt-12 xl:ml-1 hoverAnimation">
          <img
            src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
            alt=""
            className="h-9 w-9 rounded-full"
          />
          <div className="ml-3 hidden xl:block">
            <h4>firebase 1873</h4>
            <p className="text-gray-400 text-sm">@firebase1873</p>
          </div>
          <EllipsisHorizontalIcon className="h-5 w-5 ml-auto hidden xl:inline" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
