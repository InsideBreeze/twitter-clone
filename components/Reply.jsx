import {
  ChartBarIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
dayjs.extend(relativeTime);

const Reply = ({ reply }) => {
  return (
    <div className="flex border-b dark:border-gray-600 p-2 space-x-4 w-full">
      <img src={reply?.userImg} alt="" className="h-10 w-10 rounded-full" />
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <span className="mr-2 text-black dark:text-white">
            {reply?.commentor}
          </span>
          <span className="text-textGray">
            @{reply?.tag}
            {' · '}
          </span>
          <span className="ml-1 text-textGray">
            {dayjs(reply?.timestamp?.toDate()).toNow(true)}
          </span>

          <div className="hoverAnimation p-0 ml-auto h-8 w-8 text-[#71767b] hover:text-[#0D9BF0] hover:bg-[[#0D9BF0] hover:bg-opacity-20">
            <EllipsisHorizontalIcon className="h-6 w-6" />
          </div>
        </div>

        <p className="text-textGray -mt-2">
          Replying to <span className="text-twitterBlue">@{reply?.tag}</span>
        </p>
        <p className="text-black dark:text-white">{reply.comment}</p>
        {/* icons */}
        <div className="flex justify-between items-center text-[#71767b]">
          <div className=" icon p-1 h-8 w-8 -ml-2 hover:bg-[#0D9BF0] hover:bg-opacity-20  hover:text-[#0D9BF0]">
            <ChatBubbleLeftIcon className="w-[20px] h-[20px]" />
          </div>

          <div className=" icon p-1 h-8 w-8 -ml-2 hover:bg-[#f91880] hover:bg-opacity-20 hover:text-[#f91880]">
            <HeartIcon className="w-[20px] h-[20px]" />
          </div>

          <div className=" icon p-1 h-8 w-8 -ml-2 hover:bg-[#0D9BF0] hover:bg-opacity-20 hover:text-twitterBlue">
            <ShareIcon className="w-[20px] h-[20px]" />
          </div>

          <div className=" icon p-1 h-8 w-8 -ml-2 hover:bg-[#0D9BF0] hover:bg-opacity-20 hover:text-twitterBlue">
            <ChartBarIcon className="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
