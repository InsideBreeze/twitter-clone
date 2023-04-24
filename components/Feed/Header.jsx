import { SparklesIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Header = () => {
  return (
    <header className='flex justify-between px-5 h-14 border-b border-gray-600 sticky top-0 z-50 bg-black '>
      <div className='pt-3 font-semibold'>
        Home
      </div>
      <div className='flex mt-2 items-center cursor-pointer justify-center h-9 w-9 p-1 rounded-full hover:bg-gray-200 hover:bg-opacity-20'>
        <SparklesIcon className='text-white h-5' />
      </div>
    </header>
  )
}

export default Header
