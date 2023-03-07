import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useSetAtom } from "jotai";
import { isOpenAtom } from "../atoms/modalAtom";
import { postIdAtom } from "../atoms/postIdAtom";
import Post from "./Post";

dayjs.extend(relativeTime);

// comment: reply,
//    commentor: session?.user?.name,
//    tag: session?.user?.tag,
//    userImg: session?.user?.image,
//    timestamp:

const Reply = ({ reply }) => {
  //   const setIsOpen = useSetAtom(isOpenAtom);
  //   const setPostId = useSetAtom(postIdAtom);
  //   return (
  //     <div className="flex border-b border-gray-600 p-2 space-x-4 w-full">
  //       <img src={reply?.userImg} alt="" className="h-10 w-10 rounded-full" />
  //       <div className="flex flex-col w-full">
  //         <div className="flex justify-between">
  //           <span className="mr-2">{reply?.commentor}</span>
  //           <span className="text-textGray">
  //             @{reply?.tag}
  //             {" · "}
  //           </span>
  //           <span className="ml-1 text-textGray">
  //             {dayjs(reply?.timestamp?.toDate()).toNow(true)}
  //           </span>

  //           <div className="hoverAnimation p-0 ml-auto h-8 w-8 text-[#71767b] hover:text-[#0D9BF0] hover:bg-[[#0D9BF0] hover:bg-opacity-20">
  //             <EllipsisHorizontalIcon className="h-6 w-6" />
  //           </div>
  //         </div>

  //         <p className="text-textGray -mt-2">
  //           Replying to <span className="text-twitterBlue">@{reply?.tag}</span>
  //         </p>
  //         <p>{reply.comment}</p>
  //         {/* icons */}
  //         <div>
  //           <div className="flex space-x-1 items-center hover:text-[#0D9BF0]">
  //             <div
  //               className=" icon p-1 h-8 w-8 -ml-2 hover:bg-[#0D9BF0] hover:bg-opacity-20"
  //               id="message"
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //                 setIsOpen(true);
  //                 setPostId(id);
  //               }}
  //             >
  //               <ChatBubbleLeftIcon className="w-[20px] h-[20px]" />
  //             </div>

  //             <span className="w-[3px]">
  //               {replies.length === 0 || isPostPage ? "" : replies.length}
  //             </span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  return <p>lll</p>;
};

export default Reply;
