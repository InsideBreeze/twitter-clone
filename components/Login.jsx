import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from 'next/image'
import Logo from '../public/images/twitter-icon.jpg'

// how to make this component ssr?
const Login = ({ providers }) => {
  return (
    <>
      {
        providers && (
          <div className=" bg-black text-slate-50 flex flex-col items-center justify-center  space-y-10 h-screen">
            <Head>
              <title>Login</title>
            </Head>
            <Image
              width={200}
              height={200}
              alt=""
              src={Logo}
              className="h-[150px] w-[150px]"
            />
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className="relative px-6 py-3 font-bold rounded-[8px] shadow-xl 
                  bg-[conic-gradient(from_var(--shinner-angle),theme(colors.slate.900)_0%,theme(colors.slate.500)_10%,theme(colors.slate.900)_20%)]
                  animate-[shinner_2.5s_linear_infinite]
                  after:absolute after:inset-[1px] after:bg-[#0a0a0a] after:hover:bg-black after:content-[attr(aria-label)]
                  after:flex after:items-center after:justify-center after:rounded-[6px]
                  "
                  aria-label={`Login in with ${provider.name}`}
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Login in with {provider.name}
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

