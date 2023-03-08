import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import CommentModal from "../components/CommentModal";
import { useAtomValue } from "jotai";
import { isOpenAtom } from "../atoms/modalAtom";
import Widget from "../components/Widget";
const Home = ({ providers, trendingResults, followResults }) => {
  const { data: session } = useSession();
  const isOpen = useAtomValue(isOpenAtom);
  if (!session) {
    return <Login providers={providers} />;
  }
  return (
    <div className="bg-[black]">
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

        {/* Widget */}
        <Widget
          trendingResults={trendingResults}
          followResults={followResults}
        />
      </main>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getSession(context);
  // fake data
  const trendingResults = await fetch("https://www.jsonkeeper.com/b/4CD3").then(
    (result) => result.json()
  );

  const followResults = await fetch("https://www.jsonkeeper.com/b/FDU9").then(
    (result) => result.json()
  );
  return {
    props: {
      providers,
      session,
      trendingResults,
      followResults,
    },
  };
};

export default Home;
