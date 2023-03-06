import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { log } from "console";
import { doc, onSnapshot } from "firebase/firestore";
import { getProviders, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Login from "../../components/Login";
import Post from "../../components/Post";
import Sidebar from "../../components/Sidebar";
import { db } from "../../firebase";

const PostPage = ({ providers }) => {
  const [post, setPost] = useState();
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  useEffect(() =>
    onSnapshot(doc(db, "posts", id), (snapshot) => {
      setPost(snapshot.data())
    }), [db, id])

  console.log(post);
  if (!session) {
    return <Login providers={providers} />
  }
  return (
    <div className="bg-black min-h-screen">
      <Sidebar />
      <div className="flex flex-col text-white xl:mx-[240px] md:mx-[110px] sm:mx-12 flex-1 bg-[red]">
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
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  }
}
export default PostPage;
