import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Trending from './Trending';
import { useAtomValue } from 'jotai';
import { isOpenAtom } from '../../atoms/modalAtom';

const Widget = ({ trendingResults, followResults }) => {
  const isOpen = useAtomValue(isOpenAtom);
  return (
    <div className="lg:flex lg:flex-col dark:text-white lg:w-[400px] hidden overflow-y-scroll scrollbar-hide justify-start">
      {/* Search */}
      <div
        className={`flex dark:bg-[#202327]  bg-gray-100 items-center p-3 mt-2 mx-[28px] rounded-full
${isOpen ? 'z-0' : 'z-50'} sticky top-2 shadow-sm
      `}
      >
        <MagnifyingGlassIcon className="h-6 w-6" />
        <input
          className="w-full ml-2 bg-transparent outline-none"
          placeholder="Search Twitter"
        />
      </div>
      {/* Trendings */}
      <div className="dark:text-white mx-[28px] dark:bg-[#202327] bg-gray-100 mt-3 rounded-xl pl-2">
        <p className="font-semibold text-xl mb-1 p-2">Trends for you</p>
        {trendingResults &&
          trendingResults.map((trending) => (
            <Trending key={trending.description} trending={trending} />
          ))}
      </div>

      {/* Who to follow */}
      <div className="mx-[28px] dark:bg-[#202327] bg-gray-100 mt-2 rounded-xl pl-2">
        <p className="font-semibold text-xl mb-1 p-2">Who to follow</p>
        {followResults &&
          followResults.map((follow) => (
            <div
              className="flex items-center mb-2 dark:hover:bg-opacity-5 hover:bg-opacity-60 cursor-pointer hover:bg-gray-300 p-2 rounded-md transition-all ease-out duration-100"
              key={follow.username}
            >
              <img
                src={follow.userImg}
                alt=""
                className="h-11 w-11 rounded-full"
              />

              <div className="max-w-[150px] ml-2">
                <p className="truncate text-sm">{follow.username}</p>
                <p className="text-[#71767b]">{follow.tag}</p>
              </div>
              <button className="ml-auto mr-2 px-3 py-1 bg-[#eff3f4] text-black rounded-full font-semibold hover:opacity-90">
                Follow
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Widget;
