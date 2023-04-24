import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";

const Login = ({ providers }) => {
  // https://devdojo.com/tailwindcss/buttons#_
  //
  return (
    <>
      {
        providers && (
          <div className="bg-[black] flex flex-col items-center justify-center  space-y-14 h-screen">
            <Head>
              <title>Login</title>
            </Head>
            <img
              alt=""
              src="https://icon-library.com/images/twitter-icon-svg/twitter-icon-svg-28.jpg"
              className="h-[150px] w-[150px]"
            />
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
                  <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
                  <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
                  <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
                  <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                  <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                  <span className="relative">Login in with {provider.name}</span>
                </button>
              </div>
            ))}
          </div>

        )

      }
    </>
  );
};

export default Login

