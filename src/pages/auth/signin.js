import Head from "next/head";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useState } from "react";

const SignIn = () => {
    // state
    const [showPassword, setShowPassword] = useState(false);

    // function to toggle show password
    const _toggleShowPassword = (event) => {
        // prevent browser refresh
        event.preventDefault();

        // toggle show password
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Head>
                <title>Sign In</title>
            </Head>
            <section className="flex h-screen">
                <div className="//bg-zinc-800 m-auto flex h-3/4 w-3/5 flex-col items-center justify-evenly gap-5 rounded-md border border-gray-700 p-8">
                    <h1 className="text-2xl text-zinc-50">Sign In</h1>
                    <form className="flex w-full flex-col gap-5">
                        {/* email input */}
                        <div className="resize-none rounded-md border border-[#30373d] text-[1.1rem] text-[#ececf1] disabled:opacity-50">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full rounded-md bg-[#070809] p-3 outline-none"
                            />
                        </div>

                        {/* password input  */}
                        <div className="flex resize-none flex-row items-center justify-between rounded-md border border-[#30373d] pr-3 text-[1.1rem] text-[#ececf1] disabled:opacity-50">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="w-full rounded-md bg-[#070809] p-3 outline-none"
                            />
                            <button onClick={_toggleShowPassword} className="hover:opacity-80">
                                {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                            </button>
                        </div>

                        {/* login button */}
                        <button
                            type="submit"
                            className="flex items-center justify-center rounded-md bg-[#eb9722] p-3 text-[1.1rem] text-zinc-50 hover:opacity-80"
                        >
                            Login
                        </button>

                        {/* content divider */}
                        <div class="relative flex items-center py-3">
                            <div class="flex-grow border-t border-[#eb9722]"></div>
                            <span class="mx-4 flex-shrink text-zinc-400">or</span>
                            <div class="flex-grow border-t border-[#eb9722]"></div>
                        </div>

                        {/* google button */}
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-3 rounded-md border border-[#30373d] p-3 text-[1.1rem] text-zinc-50 hover:opacity-80"
                        >
                            Sign In with Google
                            <FcGoogle className="mt-0.5 text-2xl" />
                        </button>
                    </form>
                    <p className="text-md mt-7 text-zinc-300">
                        Don't have an account yet?{" "}
                        <Link href="/auth/signup" className="text-[#eb9722] hover:opacity-80">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </section>
        </>
    );
};

export default SignIn;
