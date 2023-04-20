import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useAtomValue } from "jotai";
import { getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { isOpenAtom } from "../../atoms/modalAtom";
import CommentModal from "../../components/CommentModal";
import Login from "../../components/Login";
import Post from "../../components/Post";
import Reply from "../../components/Reply";
import { db } from "../../firebase";

const PostPage = ({ providers, trendingResults, followResults }) => {
  const [post, setPost] = useState();
  const [replies, setReplies] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [reply, setReply] = useState("");

  const isOpen = useAtomValue(isOpenAtom);
  const q = query(
    collection(db, "posts", id, "replies"),
    orderBy("timestamp", "desc")
  );

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        setReplies(snapshot.docs);
      }),
    [db, id]
  );

  const sendReply = async () => {
    await addDoc(collection(db, "posts", id, "replies"), {
      comment: reply,
      commentor: session?.user?.name,
      tag: session?.user?.tag,
      userImg: session?.user.image,
      timestamp: serverTimestamp(),
    });
    setReply("");
  };

  if (!session) {
    return <Login providers={providers} />;
  }
  return (
    <div className="flex h-screen bg-black border-gray-600 border-x z-100 scrollbar-hide">
      <div className=" flex flex-col text-white h-full xl:ml-[250px] md:ml-[110px] sm:ml-14 flex-1 w-[700px] border-gray-600 border-x h-screen overflow-y-scroll scrollbar-hide">
        <div className="flex items-center p-2 space-x-4">
          <div
            className="p-2 cursor-pointer hoverAnimation"
            onClick={() => router.push("/")}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </div>
          <p className="text-xl font-semibold">Tweet</p>
        </div>
        <Post id={id} post={post} isPostPage={true} />
        {/* input */}
        <div className="flex items-center p-2 border-b border-gray-600">
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
              className="w-full bg-transparent outline-none placeholder:text-xl scrollbar-hide mt-2 min-h-[15px]"
              placeholder="Tweet your reply"
            />
          </div>
          <button
            className="bg-[#1D9BF0] rounded-full ml-3 px-4 py-1 disabled:opacity-70"
            disabled={reply.trim() === ""}
            onClick={sendReply}
          >
            Reply
          </button>
        </div>

        <div>
          {replies && replies.map((reply) => <Reply reply={reply.data()} />)}
        </div>
      </div>
      {isOpen && <CommentModal />}
    </div>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

    // fake data
  const trendingResults = await fetch("https://api.npoint.io/251beccd312711432a79").then(
    (result) => result.json()
  );

  const followResults = await fetch("https://api.npoint.io/42b9f70f56ae5969adb3").then(
    (result) => result.json()
  );

  return {
    props: {
      providers,
      trendingResults,
      followResults,
    },
  };
};
export default PostPage;
