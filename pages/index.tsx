import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import { Providers } from "../types/next-auth";
import CommentModal from "../components/CommentModal";
import { useAtomValue } from "jotai";
import { isOpenAtom } from "../atoms/modalAtom";
const Home: NextPage = ({ providers }) => {
  const { data: session } = useSession();
  const isOpen = useAtomValue(isOpenAtom);
  if (!session) {
    return <Login providers={providers} />;
  }
  return (
    <div className=" bg-[black]">
      <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen bg-[black] min-h-screen">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Modal */}
        {isOpen && <CommentModal />}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getSession(context);
  return {
    props: {
      providers,
      session,
    },
  };
};

export default Home;
