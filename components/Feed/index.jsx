import {
  collection,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import postState from '../../atoms/postState';
import { db } from '../../firebase';
import Post1 from './Post';
import Header from './Header';
import Input from './Input';
import PostSpiner from './Spinner';

const Feed = () => {
  //  const [posts, setPosts] = useState([]);

  const [posts, setPosts] = useAtom(postState);
  const [loading, setLoading] = useState(true)


  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

  useEffect(() => {
    if (!posts) {
    getDocs(q).then((snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });
    }
    setLoading(false)
  }, [posts]);


  return (
    <>
      <Header />
      <Input />
      {/* posts */}
      {!posts ? <PostSpiner /> :
        posts.map((post) => <Post1 post={post} id={post?.id} key={post.id} />)}
    </>
  );
};

export default Feed;
