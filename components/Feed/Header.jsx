import { MoonIcon, SparklesIcon, SunIcon } from '@heroicons/react/24/outline';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { darkModeAtom } from '../../atoms/themeAtom';
import { isOpenAtom } from '../../atoms/modalAtom';

const Header = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const isOpen = useAtomValue(isOpenAtom);
  return (
    <header
      className={`flex justify-between px-5 h-14 border-b dark:border-gray-600 ${isOpen ? 'z-0' : 'z-50'
        } sticky top-0 dark:bg-zinc-900 bg-white text-black dark:text-white`}
    >
      <div className="pt-3 font-semibold">Home</div>
      <div
        className="flex mt-2 items-center cursor-pointer justify-center h-9 w-9 p-1 rounded-full hover:bg-gray-200 hover:bg-opacity-20"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? (
          <SunIcon className="dark:text-white h-6" />
        ) : (
          <MoonIcon className="text-black h-6" />
        )}
      </div>
    </header>
  );
};

export default Header;
