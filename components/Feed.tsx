import { SparklesIcon } from "@heroicons/react/24/outline";
import React from "react";
import Input from "./Input";

const Feed = () => {
  return (
    <div className="text-white xl:mx-[270px] md:mx-26 sm:mx-12 border-gray-600 sm:border-l md:border-r flex-1 overflow-y-scroll scrollbar-hide">
      {/* header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-3 pt-1 bg-black border-b border-gray-600 md:p-4">
        <h2 className="font-semibold cursor-pointer md:text-xl">Home</h2>
        <div className="flex items-center justify-center p-2 hoverAnimation">
          <SparklesIcon className="w-5 h-5" />
        </div>
      </div>
      {/* input */}
      <Input />
    </div>
  );
};

export default Feed;
