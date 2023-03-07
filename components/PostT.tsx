import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { DocumentData } from "firebase/firestore";

const PostT = ({ id, post, isPostPage }: { id: string, post: DocumentData, isPostPage?: Boolean }) => {
    return (
        <div className="flex flex-col" >
            <div className="flex items-start">
                <img src={post?.posterAvatar}
                    alt=""
                    className="rounded-full h-10 w-10 hover:opacity-90 " />
                <div className="space- ml-3">
                    <span>zephyr</span>
                    <span className={`${isPostPage && "block"}`}>@zephyr</span>
                    {
                        !isPostPage && <span>23.26</span>
                    }
                </div>
                <div className="hoverAnimation p-0 ml-auto h-8 w-8 text-[#71767b] hover:text-[#0D9BF0] hover:bg-[[#0D9BF0] hover:bg-opacity-20">
                    <EllipsisHorizontalIcon className="h-6 w-6" />
                </div>
            </div>
            <p className={`ml-[52px] ${isPostPage && "ml-[2px]"}`}>This is Test</p>
            {isPostPage && (
                <>
                    <span className="ml-2 ">8.34 PM Mar5. 2025</span>
                    <p className="border-y border-gray-600">4 likes</p>
                </>

            )}
            <div>


            </div>
        </div >
    )
}

export default PostT
