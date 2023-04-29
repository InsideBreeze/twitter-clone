import data from '@emoji-mart/data/sets/14/twitter.json';
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import React, { Suspense, useReducer, useRef, useState } from 'react';
import postState from '../../atoms/postState';
import { db, storage } from '../../firebase';

const Picker = dynamic(() =>
  import(/*webpackChunkName: "Emoji-mart"*/ '@emoji-mart/react')
);

const Input = () => {
  const { data: session } = useSession();
  const [text, setText] = useState('');
  const fileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPicker, toggleEmojiPicker] = useReducer((show) => !show, false);
  const [loading, setLoading] = useState(false);

  const setPosts = useSetAtom(postState);
  const handleSelectFile = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (event) => {
      setSelectedFile(event.target.result);
      fileRef.current.value = '';
    };
  };

  const handleSendPost = async () => {
    setLoading(true);
    try {
      // sync upload text and image
      const batch = writeBatch(db);
      const postRef = doc(collection(db, 'posts'));

      batch.set(postRef, {
        id: postRef.id,
        posterId: session?.user.uid,
        posterName: session?.user.name,
        posterAvatar: session?.user.image,
        text,
        tag: session?.user.tag,
        timestamp: serverTimestamp(),
        likes: [],
        repliesCount: 0,
      });

      if (selectedFile) {
        const imageRef = ref(storage, `images/${postRef.id}/image`);
        // https://firebase.google.com/docs/storage/web/upload-files
        await uploadString(imageRef, selectedFile.toString(), 'data_url').then(
          async () => {
            const downloadURL = await getDownloadURL(imageRef);
            // once uploaded image, update this doc in the firebase
            batch.update(postRef, {
              image: downloadURL,
            });
          }
        );
      }
      await batch.commit();
      const newPost = await getDoc(doc(db, `posts/${postRef.id}`));
      setPosts((prev) => [newPost.data(), ...prev]);
    } catch (error) {
      console.log('sendPost Error: ', error.message);
    }

    setLoading(false);
    setText('');
    setSelectedFile(null);
  };

  return (
    <Suspense fallback={<p>loading...</p>}>
      <div
        className={` ${
          loading && 'opacity-60'
        } flex space-x-2 p-4 border-b dark:border-gray-600 `}
      >
        <img
          src={session?.user.image}
          alt=""
          className="w-11 h-11 rounded-full"
        />
        <div className="w-full">
          <textarea
            value={text}
            placeholder="What's happening?"
            className="w-full bg-transparent placeholder:text-gray-600 dark:placeholder:text-gray-400 text-black dark:text-white
          outline-none pl-2 text-lg min-h-[50px] max-h-[50px] scrollbar-hide"
            disabled={loading}
            onChange={(e) => setText(e.target.value)}
          />
          {!loading && (
            <React.Fragment>
              {selectedFile && (
                <div className="mb-2 relative">
                  <div>
                    <XMarkIcon
                      className="h-6 relative top-2  -left-3 cursor-pointer"
                      onClick={() => setSelectedFile(null)}
                    />
                  </div>
                  <img
                    src={selectedFile}
                    className="max-w-[400px] max-h-[400px]"
                  />
                </div>
              )}

              <div className="flex justify-between px-4 border-t dark:border-gray-600 pt-2 relative">
                <div className="flex items-center text-twitterBlue">
                  <span
                    className="icon p-[6px]"
                    onClick={() => fileRef.current.click()}
                  >
                    <PhotoIcon className="h-6 " />
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileRef}
                    onChange={handleSelectFile}
                    accept="image/jpg,image/png,image/gif,image/jpeg"
                  />
                  <span className="icon p-[6px]">
                    <ChartBarIcon className="h-6  rotate-90" />
                  </span>
                  <span className="icon p-[6px]" onClick={toggleEmojiPicker}>
                    <FaceSmileIcon className="h-6" />
                  </span>
                  <span className="icon p-[6px]">
                    <CalendarIcon className="h-6" />
                  </span>
                </div>
                <button
                  className="bg-twitterBlue px-5 py-1 rounded-full disabled:opacity-70 font-[550]"
                  disabled={text.trim().length === 0 && selectedFile === null}
                  onClick={handleSendPost}
                >
                  Tweet
                </button>
                {showPicker && (
                  <div className="absolute mt-9 -left-[1px] z-20">
                    <Picker
                      data={data}
                      theme="dark"
                      onEmojiSelect={(e) => {
                        setText(text + e.native);
                        toggleEmojiPicker();
                      }}
                      set="twitter"
                    />
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Input;
