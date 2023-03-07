import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { log } from "console";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Login from "../../components/Login";
import Post from "../../components/Post";
import PostT from "../../components/PostT";
import Reply from "../../components/Reply";
import Sidebar from "../../components/Sidebar";
import { db } from "../../firebase";

const PostPage = ({ providers }) => {
  const [post, setPost] = useState();
  const [replies, setReplies] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "replies"), (snapshot) => {
        setReplies(snapshot.docs);
      }),
    [db, id]
  );

  console.log(replies);

  if (!session) {
    return <Login providers={providers} />;
  }
  return (
    <div className="bg-black min-h-screen border-x border-gray-600 z-100">
      <Sidebar />
      <div className=" flex flex-col text-white xl:mx-[230px] md:mx-[110px] sm:mx-12 flex-1 max-w-[700px] border-gray-600 border-x h-screen">
        <div className="flex p-2 space-x-4 items-center">
          <div
            className="hoverAnimation p-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <ArrowLeftIcon className="h-6 w-6" />
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
              rows={2}
              className="w-full bg-transparent outline-none placeholder:text-xl scrollbar-hide mt-2"
              placeholder="Tweet your reply"
            />
          </div>
          <button className="bg-[#1D9BF0] rounded-full ml-3 px-4 py-1">
            Reply
          </button>
        </div>

        <div>
          {replies && replies.map((reply) => <Reply reply={reply.data()} />)}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
export default PostPage;
