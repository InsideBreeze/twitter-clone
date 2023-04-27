import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import postState from '../../atoms/postState';
import { db } from '../../firebase';
import Header from './Header';
import Input from './Input';
import Post from './Post';
import PostSpiner from './Spinner';

const Feed = () => {
  const [posts, setPosts] = useAtom(postState);
  const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

  useEffect(() => {
    if (!posts) {
      getDocs(q).then((snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [posts]);

  return (
    <>
      <Header />
      <Input />
      {/* posts */}
      {!posts ? (
        <PostSpiner />
      ) : (
        posts.map((post) => (
          <Post post={post} key={post.id} repliesCount={post.repliesCount} />
        ))
      )}
    </>
  );
};

export default Feed;
