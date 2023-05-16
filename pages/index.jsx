import { getServerSession } from 'next-auth';
import { getProviders, useSession } from 'next-auth/react';
import Feed from '../components/Feed';
import Login from '../components/Login';
import { authOptions } from './api/auth/[...nextauth]';

const Home = ({ providers }) => {
  const { data: session } = useSession();
  return !session ? <Login providers={providers} /> : <Feed />;
};

export const getServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getServerSession(context.req, context.res, authOptions)
  // fake data
  const trendingResults = await fetch(
    'https://api.npoint.io/251beccd312711432a79'
  ).then((result) => result.json());

  const followResults = await fetch(
    'https://api.npoint.io/42b9f70f56ae5969adb3'
  ).then((result) => result.json());
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
