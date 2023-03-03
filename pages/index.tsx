import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
const Home: NextPage = ({ providers }) => {
  const { data: session } = useSession();
  console.log(session, "session");
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
