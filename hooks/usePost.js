import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { useEffect, useState, useCallback } from 'react';
import postState from '../atoms/postState';
import { db } from '../firebase';

const usePost = (postId) => {
  const [posts, setPosts] = useAtom(postState);
  const [post, setPost] = useState(posts?.find((post) => post.id === postId));

  useEffect(() => {
    if (!post) {
      getDoc(doc(db, `posts/${postId}`)).then((snapshot) => {
        setPost(snapshot.data());
      });
    }
  }, []);

  const updateRepliesCount = useCallback(async () => {
    await updateDoc(doc(db, `posts/${postId}`), {
      repliesCount: increment(1),
    });

    // if there are posts, update it
    if (posts) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
              ...p,
              repliesCount: p.repliesCount + 1,
            }
            : p
        )
      );
    }
  }, [posts, postId]);

  return {
    post,
    updateRepliesCount,
  };
};

export default usePost;
