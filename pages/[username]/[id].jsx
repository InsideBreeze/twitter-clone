import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { getProviders, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Post from '../../components/Feed/Post';
import PostSpin from '../../components/Feed/Spinner';
import Reply from '../../components/Reply';
import { db } from '../../firebase';
import usePost from '../../hooks/usePost';
import Head from 'next/head';

const PostPage = () => {
  const [replies, setReplies] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [reply, setReply] = useState('');

  const { post, updateRepliesCount } = usePost(id);
  const q = query(
    collection(db, 'posts', id, 'replies'),
    orderBy('timestamp', 'desc')
  );

  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        setReplies(snapshot.docs);
      }),
    [db, id]
  );

  const sendReply = async () => {
    await addDoc(collection(db, 'posts', id, 'replies'), {
      comment: reply,
      commentor: session?.user?.name,
      tag: session?.user?.tag,
      userImg: session?.user.image,
      timestamp: serverTimestamp(),
    });

    setReply('');
    await updateRepliesCount();
  };

  if (!post) {
    return <PostSpin />;
  }

  return (
    <>
      <Head>
        <title>
          {post?.posterName} on Twitter: "{post?.text}"
        </title>
      </Head>
      <div className="flex items-center p-2 space-x-4 text-black dark:text-white">
        <Link
          className="p-2 cursor-pointer hover:bg-gray-300 rounded-full hover:bg-opacity-20"
          href="/"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <p className="text-xl font-semibold">Tweet</p>
      </div>
      {post && (
        <Post id={id} post={post} isPostPage repliesCount={replies.length} />
      )}
      {/* input */}
      <div className="flex items-center p-2 border-b dark:border-gray-600">
        <img
          src={session?.user?.image}
          alt=""
          className="rounded-full h-11 w-11"
        />
        <div className="w-full ml-2">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={2}
            className="w-full bg-transparent outline-none placeholder:text-lg scrollbar-hide mt-3 min-h-[15px]
placeholder:text-gray-600 dark:placeholder:text-gray-400 text-black dark:text-white text-lg ml-1
            "
            placeholder="Tweet your reply"
          />
        </div>
        <button
          className="bg-[#1D9BF0] rounded-full ml-3 px-4 py-1 disabled:opacity-70"
          disabled={reply.trim() === ''}
          onClick={sendReply}
        >
          Reply
        </button>
      </div>

      <div>
        {replies &&
          replies.map((reply) => <Reply key={reply.id} reply={reply.data()} />)}
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  // fake data
  const trendingResults = await fetch(
    'https://api.npoint.io/251beccd312711432a79'
  ).then((result) => result.json());

  const followResults = await fetch(
    'https://api.npoint.io/42b9f70f56ae5969adb3'
  ).then((result) => result.json());

  return {
    props: {
      providers,
      trendingResults,
      followResults,
    },
  };
};
export default PostPage;
