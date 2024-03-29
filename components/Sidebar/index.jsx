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
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import SidebarLink from './SidebarLink';
import Image from 'next/image'
import Logo from '../../public/images/twitter-logo.svg'

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <div className="hidden sm:flex flex-col xl:w-[250px]  md:pl-10 md:w-[110px] items-start pt-2 fixed xl:pl-4 h-full sm:w-14">
      <div className="p-3 hoverAnimation" onClick={() => router.push('/')}>
        <Image
          //src="https://icon-library.com/images/twitter-icon-svg/twitter-icon-svg-28.jpg"
          src={Logo}
          alt=""
          className="w-8 h-8"
        />
      </div>
      <div className="dark:text-[#d9d9d9]  flex flex-col mt-4 items-start justify-center">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notificatons" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardDocumentListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} />
      </div>
      <div className="h-[100%] flex flex-col justify-between">
        <button
          className="hidden xl:flex bg-[#1d9bf0] hover:bg-[#1a8cd8] w-[210px] h-[52px]
        justify-center items-center rounded-full mt-3 text-white text-xl"
        >
          Tweet
        </button>
        {/* user info */}
        <div className="dark:text-white xl:ml-1 hoverAnimation">
          <img
            src={session?.user?.image ?? ''}
            alt=""
            className="w-10 h-10 rounded-full"
            onClick={() => signOut()}
          />
          <div className="hidden ml-3 xl:block">
            <h4>{session?.user?.name}</h4>
            <p className="text-sm dark:text-gray-400">@{session?.user?.tag}</p>
          </div>
          <EllipsisHorizontalIcon className="hidden w-5 h-5 ml-auto xl:inline" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
