import React from 'react';
import Widget from '../Widget';
import Sidebar from '../Sidebar';
import Head from 'next/head';
import { useAtomValue } from 'jotai';
import { isOpenAtom } from '../../atoms/modalAtom';
import { useSession } from 'next-auth/react';
import Login from '../Login';
import Modal from '../Modal';

const Layout = ({ trendingResults, followResults, children, providers }) => {
  const isOpen = useAtomValue(isOpenAtom);

  const { data: session } = useSession();

  if (!session) {
    return <Login providers={providers} />;
  }

  return (
    <div className="bg-[black] h-screen min-h-screen">
      <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen bg-[black] h-screen">
        {/* sidebar */}
        <Sidebar />

        <div
          className="text-white xl:ml-[250px] md:ml-[110px] sm:ml-14 border-gray-600 sm:border-l
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
