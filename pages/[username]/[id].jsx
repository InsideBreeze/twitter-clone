import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import CommentModal from "../../components/CommentModal";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Login from "../../components/Login";
import Post from "../../components/Post";
import Reply from "../../components/Reply";
import Sidebar from "../../components/Sidebar";
import Widget from "../../components/Widget";
import { db } from "../../firebase";
import { useAtomValue } from "jotai";
import { isOpenAtom } from "../../atoms/modalAtom";

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
    <div className="bg-black h-screen border-x border-gray-600 z-100 flex scrollbar-hide">
      <Sidebar />
      <div className=" flex flex-col text-white h-full xl:ml-[250px] md:ml-[110px] sm:ml-14 flex-1 w-[700px] border-gray-600 border-x h-screen overflow-y-scroll scrollbar-hide">
        <div className="flex p-2 space-x-4 items-center">
          <div
            className="hoverAnimation p-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </div>
          <p className="font-semibold text-xl">Tweet</p>
        </div>
        <Post id={id} post={post} isPostPage={true} />
        {/* input */}
        <div className="p-2 flex items-center border-b border-gray-600">
          <img
            src={session?.user?.image}
            alt=""
            className="h-11 w-11 rounded-full"
          />
          <div className="w-full ml-2">
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={2}
              className="w-full bg-transparent outline-none placeholder:text-xl scrollbar-hide mt-2"
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
      <Widget trendingResults={trendingResults} followResults={followResults} />

      {/* Modal */}
      {isOpen && <CommentModal />}
    </div>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  // fake data
  const trendingResults = await fetch("https://www.jsonkeeper.com/b/4CD3").then(
    (result) => result.json()
  );

  const followResults = await fetch("https://www.jsonkeeper.com/b/FDU9").then(
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
