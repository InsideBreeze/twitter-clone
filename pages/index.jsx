import { useAtomValue } from "jotai";
import { getProviders, getSession, useSession } from "next-auth/react";
import { isOpenAtom } from "../atoms/modalAtom";
import Feed from "../components/Feed";
import Login from "../components/Login";
const Home = ({ providers, trendingResults, followResults }) => {
  const { data: session } = useSession();
  const isOpen = useAtomValue(isOpenAtom);
  if (!session) {
    return <Login providers={providers} />;
  }
  return (
    <Feed />
  )
 };

export const getServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getSession(context);
  // fake data
  const trendingResults = await fetch("https://api.npoint.io/251beccd312711432a79").then(
    (result) => result.json()
  );

  const followResults = await fetch("https://api.npoint.io/42b9f70f56ae5969adb3").then(
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
