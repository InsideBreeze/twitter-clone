import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ArrowsRightLeftIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import { useRouter } from "next/router";
import { useSetAtom } from "jotai";
import { isOpenAtom } from "../atoms/modalAtom";
import { postIdAtom } from "../atoms/postIdAtom";
dayjs.extend(relativeTime);

const Post = ({ id, post, isPostPage }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [replies, setReplies] = useState([]);
  const setIsOpen = useSetAtom(isOpenAtom);
  const setPostId = useSetAtom(postIdAtom);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      // use setDoc to specify a id
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.uid,
      });
    }
  };

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db]
  );

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  // fetch replies
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "replies"), (snapshot) => {
        setReplies(snapshot.docs);
      }),
    [db, id]
  );

  return (
    <div
      className="flex w-full p-2 space-x-3 border-b border-gray-700 cursor-pointer scrollbar-hide"
      onClick={() => router.push(`/${post?.tag}/${id}`)}
    >
      <img
        src={post?.posterAvatar}
        alt=""
        className="rounded-full h-10 w-10 hover:opacity-90"
      />
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center w-full">
          <div className={`${!isPostPage && "flex"}`}>
            <span className="hover:underline mr-1">{post?.posterName}</span>{" "}
            <div className="ml-">
              <span className={`text-[#71767b] ${isPostPage && "block"}`}>
                @{post?.tag}
                {!isPostPage && " · "}
              </span>
            </div>
          </div>
          {!isPostPage && (
            <span className="ml-1 text-[#71767b]">
              {dayjs(post?.timestamp?.toDate()).toNow(true)}
            </span>
          )}
          <div className="hoverAnimation p-0 ml-auto h-8 w-8 text-[#71767b] hover:text-[#0D9BF0] hover:bg-[[#0D9BF0] hover:bg-opacity-20">
            <EllipsisHorizontalIcon className="h-6 w-6" />
          </div>
        </div>
        <div className={`${isPostPage && "-ml-[50px] mt-1"} w-full`}>
          <p>{post?.text}</p>
          <img
            src={post?.image}
            alt=""
            className="max-h-[350px] object-cover rounded-xl"
          />
          {isPostPage && (
            <>
              <p className="mt-3 text-[#71767b]">
                {dayjs(post?.timestamp?.toDate()).format(
                  "H:mm A · MMM D, YYYY"
                )}
              </p>
              {likes.length > 0 && (
                <p className="py-3 border-y border-gray-600 w-full">
                  {`${likes.length} Like${likes.length > 1 ? "s" : ""}`}
                </p>
              )}
            </>
          )}
        </div>
        {/* buttons */}
        <div
          className={`flex items-center justify-between  mt-2 w-full text-[#71767b] ${isPostPage && "-ml-[12px]"
            }`}
        >
          <div className="flex space-x-1 items-center hover:text-[#0D9BF0]">
            <div
              className=" icon p-1 h-8 w-8 -ml-2 hover:bg-[#0D9BF0] hover:bg-opacity-20"
              id="message"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
                setPostId(id);
              }}
            >
              <ChatBubbleLeftIcon className="w-[20px] h-[20px]" />
            </div>

            <span className="w-[3px]">
              {replies.length === 0 || isPostPage ? "" : replies.length}
            </span>
          </div>

          {session?.user?.uid === post?.id ? (
            <div
              className="icon hover:text-[red] h-8 w-8 hover:bg-[red] hover:bg-opacity-20"
              onClick={async (e) => {
                e.stopPropagation();
                await deleteDoc(doc(db, "posts", id));
              }}
            >
              <TrashIcon className="w-[20px] h-[20px]" />
            </div>
          ) : (
            <div className="icon h-8 w-8 hover:text-[#0D9BF0] hover:bg-[#0D9BF0] hover:bg-opacity-20">
              <ArrowsRightLeftIcon className="w-[20px] h-[20px]" />
            </div>
          )}
          <div className="flex items-center space-x-1 hover:text-[#f91880]">
            <div
              className={`icon h-8 w-8 ${liked && "text-[#f91880]"
                } hover:bg-[#f91880] hover:bg-opacity-20`}
              onClick={handleLike}
            >
              {liked ? (
                <>
                  <FilledHeartIcon className="w-[20px] h-[20px]" />
                </>
              ) : (
                <HeartIcon className="w-[20px] h-[20px]" />
              )}
            </div>
            <span className="w-[3px]">
              {likes.length === 0 ? "" : likes.length}
            </span>
          </div>

          <div className="icon h-8 w-8 hover:text-[#0D9BF0] hover:bg-[#0D9BF0] hover:bg-opacity-20">
            <ShareIcon className="w-[20px] h-[20px]" />
          </div>
          <div className="icon h-8 w-8 mr- hover:text-[#0D9BF0] hover:bg-[bg-opacity-20]">
            <ChartBarIcon className="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
