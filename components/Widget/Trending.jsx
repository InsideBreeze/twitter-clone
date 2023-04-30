import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import React from 'react';

const Trending = ({ trending }) => {
  return (
    <div className="flex justify-between items-center dark:hover:bg-opacity-5 hover:bg-opacity-60 cursor-pointer hover:bg-gray-300 p-2 rounded-md transition-all ease-out duration-100">
      <div>
        <p className="text-[#71767b] text-sm">{trending.heading}</p>
        <p>{trending.description}</p>
      </div>
      <div className="hoverAnimation h-8 w-8 p-0 text-[#71767b] hover:text-twitterBlue">
        <EllipsisHorizontalIcon className="h-6 w-6" />
      </div>
    </div>
  );
};

export default Trending;
