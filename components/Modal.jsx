import {
  ArrowLeftIcon,
  CalendarIcon,
  FaceSmileIcon,
  GifIcon,
  MapPinIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import * as Dialog from '@radix-ui/react-dialog';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  addDoc,
  collection,
  serverTimestamp
} from 'firebase/firestore';
import { useAtom, useAtomValue } from 'jotai';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { isOpenAtom } from '../atoms/modalAtom';
import { postIdAtom } from '../atoms/postIdAtom';
import { db } from '../firebase';
import usePost from '../hooks/usePost';

dayjs.extend(relativeTime);
const DialogDemo = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const postId = useAtomValue(postIdAtom);
  const [text, setText] = React.useState('');
  const { data: session } = useSession();

  const router = useRouter();

  // const [posts, setPosts] = useAtom(postState);
  // const [post, setPost] = useState(posts?.find((post) => post.id === postId));

  // useEffect(() => {
  //   if (!post) {
  //     getDoc(doc(db, `posts/${postId}`)).then((snapshot) => {
  //       setPost(snapshot.data());
  //     });
  //   }
  // }, []);

  const { post, updateRepliesCount } = usePost(postId)

  const sendReply = async () => {
    await addDoc(collection(db, `posts/${postId}/replies`), {
      comment: text,
      commentor: session?.user?.name,
      tag: session?.user?.tag,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });
    await updateRepliesCount()
    // await updateDoc(doc(db, `posts/${postId}`), {
    //   repliesCount: increment(1),
    // });

    // // if there are posts, update it
    // if (posts) {
    //   setPosts((prev) =>
    //     prev.map((p) =>
    //       p.id === postId
    //         ? {
    //             ...p,
    //             repliesCount: p.repliesCount + 1,
    //           }
    //         : p
    //     )
    //   );
    //}
    setIsOpen(false);
    router.push(`/${post?.tag}/${postId}`);
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`sm:bg-gray-800 bg-black sm:opacity-25 opacity-100 data-[state=open]:animate-overlayShow fixed inset-0`}
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed z-100 top-[30%] sm:left-[50%]  left-[48%] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-black sm:pt-14 sm:px-[10px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none text-white">
          <div className="flex space-x-2">
            <div className="flex flex-col items-center">
              <span>
                <img
                  src={post?.posterAvatar}
                  className="h-12 w-12 rounded-full"
                />
              </span>
              <span className="h-12 bg-gray-200 w-[1px] my-1" />
              <span>
                <img
                  src={session?.user?.image}
                  className="h-12 w-12 rounded-full"
                />
              </span>
            </div>
            <div className="flex-1">
              <p>
                {post?.posterName}{' '}
                <span className="text-[#71767b]">
                  @{post?.tag} {' · '}
                </span>
                <span className="text-[#71767b]">
                  {dayjs(post?.timestamp?.toDate()).toNow(true)}
                </span>
              </p>
              <p className="">
                {post?.text || <span className="opacity-0">cc</span>}
              </p>
              <p className="my-3 text-[#71767b]">
                Replying to
                <span className="text-twitterBlue ml-1 hover:cursor-pointer">
                  @{post?.posterName}
                </span>
              </p>
              <textarea
                value={text}
                className="w-full bg-transparent outline-none text-xl p-2 h-24 min-h-[96px] max-h-24"
                placeholder="Reply your reply"
                onChange={(e) => setText(e.target.value)}
              />
              {/* icons */}
              <div className="flex justify-between p-2">
                <div className="flex space-x-5 items-center text-twitterBlue">
                  <PhotoIcon className="h-5" />
                  <GifIcon className="h-5" />
                  <FaceSmileIcon className="h-5" />
                  <CalendarIcon className="h-5" />
                  <MapPinIcon className="h-5" />
                </div>
                <button
                  className="hidden sm:inline px-3 py-1 bg-twitterBlue rounded-full disabled:opacity-50"
                  disabled={text.trim().length === 0}
                  onClick={sendReply}
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
          <Dialog.Close asChild>
            <div
              className="justify-between  p-0 absolute sm:top-[10px] sm:left-[10px] -top-14 -left-5 inline-flex "
              aria-label="Close"
            >
              <div
                className="hover:bg-gray-600 p-1 appearance-none items-center rounded-full focus:outline-none hover:bg-opacity-40"
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon className="h-6 hidden sm:inline" />
                <ArrowLeftIcon className="h-6 sm:hidden ml-1" />
              </div>
              <button
                className="sm:hidden px-3 py-1 bg-twitterBlue rounded-full disabled:opacity-50"
                disabled={text.trim().length === 0}
                onClick={sendReply}
              >
                Reply
              </button>
            </div>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDemo;
