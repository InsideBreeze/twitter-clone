import React from "react";
import Widget from "./Widget";
import Sidebar from "./Sidebar";
import Head from "next/head";

const Layout = ({ trendingResults, followResults, children }) => {
  return (
    <div className="bg-[black] h-screen min-h-screen">
      <Head>
        <title>Twitter clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen bg-[black] h-screen">
        {/* sidebar */}
        <Sidebar />

        {children}
        {/* widget */}
        <Widget
          trendingResults={trendingResults}
          followResults={followResults}
        />
      </main>
    </div>
  );
};

export default Layout;
