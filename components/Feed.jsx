import { SparklesIcon } from "@heroicons/react/24/outline";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Input from "./Input";
import Post from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs);
      }),
    [db]
  );
  return (
    <div
      className="text-white xl:ml-[250px] md:ml-[110px] sm:ml-14 border-gray-600 sm:border-l md:border-r flex-1
          overflow-y-scroll scrollbar-hide w-[700px]"
    >
      {/* header */}
      <div className="sticky top-0 flex items-center justify-between p-2 pb-5 bg-black border-b border-gray-600 z-5">
        <h2 className="font-semibold cursor-pointer md:text-xl">Home</h2>
        <div className="flex items-center justify-center w-9 h-9 p hoverAnimation">
          <SparklesIcon className="w-5 h-5" />
        </div>
      </div>
      {/* input */}
      <Input />
      {/* posts */}
      {posts?.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} />
      ))}
    </div>
  );
};

export default Feed;
