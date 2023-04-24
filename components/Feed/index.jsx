import { SparklesIcon } from "@heroicons/react/24/outline";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Header from "./Header";
import Input from "./Input";
import Post from "../Post";

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
    <>
      <Header />
      <Input />
      {/* posts */}
      {posts &&
        posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}

    </>
  );
};

export default Feed;
