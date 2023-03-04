import { DocumentData } from "firebase/firestore";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ChartBarIcon,
  ChatBubbleLeftIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

dayjs.extend(relativeTime);

const Post = ({ id, post }: { id: string; post: DocumentData }) => {
  return (
    <div className="flex w-full p-2 space-x-3 border-b border-gray-700 cursor-pointer">
      <img
        src={post.posterAvatar}
        alt=""
        className="rounded-full h-11 w-11 hover:opacity-90"
      />
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center space-x-2">
          <h4 className="hover:underline">{post.posterName}</h4>{" "}
          <div className="">
            <span className="text-[#536471] text-sm">
              @{post.tag}
              {" · "}
            </span>
            <span className="text-[#536471]">
              {dayjs(post?.timestamp?.toDate()).toNow(true)}
            </span>
          </div>
        </div>
        <p>{post.text}</p>
        <div className="">
          <img
            src={post.image}
            alt=""
            className="max-h-[350px] object-cover rounded-xl"
          />
        </div>
        {/* buttons */}
        <div className="flex items-center justify-between w-full mt-4">
          <div className=" hover:text-[#0D9BF0] p-0">
            <ChatBubbleLeftIcon className="w-[20px] h-[20px]" />
          </div>
          <div className="icon hover:text-[red]">
            <TrashIcon className="w-[20px] h-[20px]" />
          </div>
          <div className="icon hover:text-[red]">
            <HeartIcon className="w-[20px] h-[20px]" />
          </div>
          <div className="">
            <ShareIcon className="w-[20px] h-[20px]" />
          </div>
          <div className="">
            <ChartBarIcon className="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
