import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeftIcon,
  CalendarIcon,
  FaceSmileIcon,
  GifIcon,
  MapPinIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useAtom, useAtomValue } from "jotai";
import { Fragment, useEffect, useState } from "react";
import { isOpenAtom } from "../atoms/modalAtom";
import { postIdAtom } from "../atoms/postIdAtom";
import { db } from "../firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

dayjs.extend(relativeTime);

export default function MyModal() {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const postId = useAtomValue(postIdAtom);
  const [post, setPost] = useState();
  const [reply, setReply] = useState("");
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
      })[(db, postId)]
  );

  const sendReply = async () => {
    // await addDoc(collection(db, "posts", postId, "replies"), {
    //   comment: reply,
    //   commentor: session?.user?.name,
    //   tag: session?.user?.tag,
    //   userImg: session?.user?.image,
    //   timestamp: serverTimestamp(),
    // });
    await addDoc(collection(db, "posts"), {
      id: session?.user.uid,
      posterName: session?.user.name,
      posterAvatar: session?.user.image,
      text: reply,
      tag: session?.user.tag,
      timestamp: serverTimestamp(),
    });
    setIsOpen(false);
    router.push(`/${post?.tag}/${postId}`);
  };
  return (
    <>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0  bg-[#5b7083] bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto bg-[black] md:bg-transparent">
            <div className="flex justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full p-1 text-white md:mt-4 max-w-[600px] rounded-xl bg-[black] transform overflow-hidden shadow-2xl transition-all">
                  <div
                    className="hoverAnimation p-1 h-8 w-8 hidden md:block mb-[15px]"
                    onClick={() => setIsOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center justify-between md:hidden">
                    <div
                      className="hoverAnimation  h-8 w-8"
                      onClick={() => setIsOpen(false)}
                    >
                      <ArrowLeftIcon className="h-5 w-5" />
                    </div>
                    <button
                      className="bg-[#1D9BF0] text-white px-3 py-1 rounded-full mr-2 disabled:opacity-70"
                      disabled={reply.trim() === ""}
                      onClick={sendReply}
                    >
                      Reply
                    </button>
                  </div>
                  <div className="flex flex-col mt-2">
                    <div className="flex space-x-3 items-start">
                      <img
                        src={post?.posterAvatar}
                        alt=""
                        className="h-9 w-9 rounded-full cursor-pointer"
                      />

                      <div className="flex flex-col items-start">
                        <div className="flex space-x-1">
                          <span>{post?.posterName}</span>
                          <span className="text-[#71767b]">
                            @{post?.tag}
                            {" · "}
                          </span>
                          <span className="text-[#71767b]">
                            {dayjs(post?.timestamp?.toDate()).toNow(true)}
                          </span>
                        </div>
                        <p>{post?.text}</p>

                        <div className="relative">
                          <p className="pt-2 pb-7">
                            <span className="text-[#71767b] mr-1">
                              Replying to
                            </span>
                            <span className="text-[#1D9BF0]">@{post?.tag}</span>
                          </p>

                          <span className="w-0.5 absolute -left-[30px] h-full bg-gray-600 -top-2 h-10" />
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <img
                        src={session?.user?.image}
                        alt=""
                        className="h-9 w-9 rounded-full cursor-pointer"
                      />
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        rows={2}
                        className="bg-transparent w-full outline-none min-h-[120px] placeholder:text-xl scrollbar-hide
                        max-h-[120px]"
                        placeholder="Tweet your reply"
                      />
                    </div>
                    {/* icons */}
                    <div className="flex ml-12 text-[#1D9BF0] items-center justify-between mb-1">
                      <div className="flex space-x-[10px] items-center">
                        <div>
                          <PhotoIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <GifIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <FaceSmileIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <CalendarIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <MapPinIcon className="h-5 w-5" />
                        </div>
                      </div>
                      <button
                        className="hidden md:inline-block bg-[#1D9BF0] text-white px-3 py-1 rounded-full mr-2 disabled:opacity-70"
                        disabled={reply.trim() === ""}
                        onClick={sendReply}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
