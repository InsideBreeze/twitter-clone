import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import data from "@emoji-mart/data/sets/14/twitter.json";
import Picker from "@emoji-mart/react";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";

const Input = () => {
  const filePickerRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const attachFile = (e) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target) {
        setSelectedFile(readerEvent.target.result);
      }
    };
  };

  const sendPost = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session?.user.uid,
      posterName: session?.user.name,
      posterAvatar: session?.user.image,
      text: input,
      tag: session?.user.tag,
      timestamp: serverTimestamp(),
    });

    if (selectedFile) {
      const imageRef = ref(storage, `images/${docRef.id}/image`);
      // https://firebase.google.com/docs/storage/web/upload-files
      await uploadString(imageRef, selectedFile.toString(), "data_url").then(
        async () => {
          const downloadURL = await getDownloadURL(imageRef);
          // once uploaded image, update this doc in the firebase
          await updateDoc(docRef, {
            image: downloadURL,
          });
        }
      );
    }
    setLoading(false);
    setInput("");
    setSelectedFile(null);
  };
  return (
    <div
      className={`flex p-2 items-start px-5 mt-2 space-x-2 ${loading && "opacity-50"
        } border-b border-gray-700`}
    >
      <img
        src={session?.user?.image ?? ""}
        alt=""
        className="w-11 h-11 rounded-full cursor-pointer"
      />
      <div className="relative flex flex-col w-full ">
        <textarea
          name=""
          id=""
          rows={2}
          className={`bg-transparent outline-none min-h-[49px] lg:text-base pt-1 md:placeholder:text-lg
          placeholder:text-gray-401  overflow-y-scroll scrollbar-hide`}
          placeholder="What's happening?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {selectedFile && (
          <div className="mt-4 mb-9">
            <div
              className="cursor-pointer hover:bg-opacity-20"
              onClick={() => {
                filePickerRef.current.value = "";

                setSelectedFile(null);
              }}
            >
              <XMarkIcon className="absolute w-6 h-6 -mt-3 -ml-3" />
            </div>
            <div>
              <img
                src={selectedFile.toString()}
                alt=""
                className="max-h-[330px] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}
        {!loading && (
          <div className="flex justify-between p-2 border-gray-700 border-t">
            <div className="flex text-[#1D9BF0]">
              <div
                className="icon w-9 h-9"
                onClick={() => filePickerRef.current?.click()}
              >
                <PhotoIcon className="w-6 h-6" />
              </div>
              <input
                type="file"
                ref={filePickerRef}
                className="hidden"
                onChange={attachFile}
              />

              <div className="rotate-90 icon w-9 h-9">
                <ChartBarIcon className="w-6 h-6" />
              </div>
              <div
                className="icon h-9 w-9"
                onClick={() => setShowEmoji(!showEmoji)}
              >
                <FaceSmileIcon className="w-6 h-6" />
              </div>
              <div className="icon h-9 w-9">
                <CalendarIcon className="w-6 h-6" />
              </div>
            </div>
            {showEmoji && (
              <div className="absolute mt-8 -ml-2">
                <Picker
                  data={data}
                  theme="dark"
                  onEmojiSelect={(e) => {
                    setInput(input + e.native);
                    setShowEmoji(false);
                  }}
                  set="twitter"
                />
              </div>
            )}
            <button
              className="font-semibold text-white disabled:opacity-80 bg-[#1D9BF0] p-1 px-5 rounded-full"
              disabled={input.trim() === "" && selectedFile === null}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
