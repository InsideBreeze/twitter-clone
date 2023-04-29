import {
  ArrowsRightLeftIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { isOpenAtom } from '../../atoms/modalAtom';
import { postIdAtom } from '../../atoms/postIdAtom';
import postState from '../../atoms/postState';
import { db } from '../../firebase';
dayjs.extend(relativeTime);
const Post = ({ post: { id, ...post }, isPostPage, repliesCount }) => {
  const { data: session } = useSession();

  const setPosts = useSetAtom(postState);
  const setIsOpen = useSetAtom(isOpenAtom);
  const setPostId = useSetAtom(postIdAtom);

  const router = useRouter();

  const liked = post.likes.findIndex((id) => id === session?.user?.uid) !== -1;

  const handleLike = async (e) => {
    e.stopPropagation();
    if (liked) {
      console.log(
        'newLikes',
        post.likes.filter((id) => id !== session?.user?.uid)
      );
      const newLikes = post.likes.filter((id) => id !== session?.user?.uid);
      await updateDoc(doc(db, `posts/${id}`), {
        likes: newLikes,
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                likes: newLikes,
              }
            : p
        )
      );
    } else {
      await updateDoc(doc(db, `posts/${id}`), {
        likes: [...post.likes, session?.user?.uid],
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                likes: p.likes.concat(session?.user?.uid),
              }
            : p
        )
      );
    }
  };

  return (
    <div
      className="p-3 cursor-pointer border-b dark:border-gray-600 pb-1"
      onClick={() => router.push(`/${post.tag}/${id}`)}
    >
      <div className="flex justify-between items-start">
        {/* header */}
        <div className="flex  items-start space-x-2">
          <img
            src={post.posterAvatar}
            className="rounded-full h-10 w-10 inline"
          />
          <span className="flex items-center space-x-1 text-black dark:text-white">
            <span className="hover:underline">{post.posterName}</span>
            <span className={`${isPostPage && 'hidden'} text-[#71767b]`}>
              @{post.tag}
              {' · '}
              {dayjs(post.timestamp?.toDate()).toNow(true)}
            </span>
          </span>
        </div>
        <div className="p-[2px] hover:bg-gray-600 flex items-center jusify-center rounded-full dark:hover:bg-opacity-70 hover:bg-opacity-10 text-black dark:text-white">
          <EllipsisHorizontalIcon className="h-6" />
        </div>
      </div>

      <div className={`${!isPostPage && 'hidden'} -mt-4 ml-11 text-[#71767b]`}>
        @{post.tag}
      </div>
      <div className={`${isPostPage ? 'ml-0' : 'ml-12'}`}>
        <div className={`${!isPostPage && '-mt-4'}`}>
          <p className="text-black dark:text-white">{post.text}</p>
          {post.image && (
            <img
              src={post.image}
              alt="post image"
              height={350}
              width={350}
              className="max-h-[350px] max-w-[350px] rounded-sm mt-1 mb-2"
            />
          )}
          <time className={`${isPostPage ? 'block' : 'hidden'} text-[#71767b]`}>
            {dayjs(post.timestamp?.toDate()).format('H:mm A · MMM D, YYYY')}
          </time>
        </div>
      </div>

      <div className="ml-11 flex justify-between text-[#71767b]">
        <div className="flex items-center">
          <div
            className="items-center justify-center p-[7px] hover:bg-[#0D9BF0] hover:text-[#0D9BF0] hover:bg-opacity-20 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
              setPostId(id);
            }}
          >
            <ChatBubbleLeftIcon className="h-5" />
          </div>
          <span className={`${repliesCount === 0 && 'opacity-0'}`}>
            {repliesCount}
          </span>
        </div>

        {session?.user.uid === post.posterId ? (
          <div className="flex items-center justify-center p-[7px] hover:bg-[red] hover:text-[red] hover:bg-opacity-20 rounded-full">
            <TrashIcon
              className="h-5"
              onClick={async (e) => {
                e.stopPropagation();
                await deleteDoc(doc(db, 'posts', id));
                setPosts((prev) => prev.filter((e) => e.id !== id));
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center p-[7px] hover:bg-[#0D9BF0] hover:text-[#0D9BF0] hover:bg-opacity-20 rounded-full">
            <ArrowsRightLeftIcon className="h-5" />
          </div>
        )}

        <div className="flex items-center justify-center">
          <div
            className="flex items-center hover:bg-[#f91880] p-[7px] hover:text-[#f91880] hover:bg-opacity-20 rounded-full"
            onClick={handleLike}
          >
            {liked ? (
              <FilledHeartIcon className="h-5 text-[#f91880]" />
            ) : (
              <HeartIcon className="h-5" />
            )}
          </div>

          <span className={`${post.likes.length === 0 && 'opacity-0'}`}>
            {post.likes.length}
          </span>
        </div>

        <div className="flex items-center justify-center p-[7px] hover:bg-[#0D9BF0] hover:text-[#0D9BF0] hover:bg-opacity-20 rounded-full">
          <ShareIcon className="h-5" />
        </div>

        <div className="flex items-center justify-center p-[7px] hover:bg-[#0D9BF0] hover:text-[#0D9BF0] hover:bg-opacity-20 rounded-full">
          <ChartBarIcon className="h-5" />
        </div>
      </div>
    </div>
  );
};

export default Post;
