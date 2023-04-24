import Layout from "../components/Layout";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, trendingResults, followResults, providers, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout trendingResults={trendingResults} followResults={followResults} providers={providers}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
