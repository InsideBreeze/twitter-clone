import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
        {/* Sidebar */}
        <Sidebar />
      </main>
    </div>
  );
};

export default Home;
