import React from 'react';
import Widget from '../Widget';
import Sidebar from '../Sidebar';
import Head from 'next/head';
import { useAtomValue } from 'jotai';
import { isOpenAtom } from '../../atoms/modalAtom';
import { useSession } from 'next-auth/react';
import Login from '../Login';
import Modal from '../Modal';
import { darkModeAtom } from '../../atoms/themeAtom';

const Layout = ({ trendingResults, followResults, children, providers }) => {
  const isOpen = useAtomValue(isOpenAtom);

  const { data: session } = useSession();

  const darkMode = useAtomValue(darkModeAtom);

  if (!session) {
    return <Login providers={providers} />;
  }

  return (
    <div className={`h-screen min-h-screen ${darkMode && 'dark'} text-black`}>
      <Head>
        <title>Twitter clone</title>
        <meta
          name="description"
          content="a simple twitter clone used for learning"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen dark:bg-zinc-900 h-screen bg-white">
        {/* sidebar */}
        <Sidebar />

        <div
          className="text-white xl:ml-[250px] md:ml-[110px] sm:ml-14 dark:border-gray-600 sm:border-l
        md:border-r flex-1 overflow-y-scroll scrollbar-hide w-[700px]"
        >
          {children}
        </div>
        {/* widget */}
        <Widget
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {isOpen && <Modal />}
      </main>
    </div>
  );
};

export default Layout;
