import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className=" bg-[black]">
      <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen bg-[black] min-h-screen">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}d
        <Feed />
      </main>
    </div>
  );
};

export default Home;
