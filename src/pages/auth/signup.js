import Head from "next/head";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useState } from "react";

const SignUp = () => {
    // state
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    // function to toggle show password
    const _toggleShowPassword = (event, type) => {
        // prevent browser refresh
        event.preventDefault();

        // toggle show password
        if (type === "confirm") {
            setShowCPassword(!showCPassword);
        } else {
            setShowPassword(!showPassword);
        }
    };

    // function to handle google signin
    const _handleGoogleSignin = async () => {
        signIn("google", { callbackUrl: "http://localhost:3000/" });
    };

    // return (
    //     <>
    //         <Head>
    //             <title>Sign Up</title>
    //         </Head>
    //         <section className="flex h-screen">
    //             <div className="m-auto flex h-4/5 w-3/5 max-w-lg flex-col items-center justify-evenly gap-5 rounded-md border border-gray-700 p-8">
    //                 <h1 className="text-2xl text-zinc-50">Sign Up</h1>
    //                 {/* Formik */}
    //             </div>
    //         </section>
    //     </>
    // );

    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <section className="flex h-screen">
                <div className="m-auto flex h-4/5 w-3/5 max-w-lg flex-col items-center justify-evenly gap-5 rounded-md border border-gray-700 p-8">
                    <h1 className="text-2xl text-zinc-50">Sign Up</h1>
                    <form className="flex w-full flex-col gap-5">
                        {/* username input */}
                        <div className="resize-none rounded-md border border-[#30373d] text-[1.1rem] text-[#ececf1] disabled:opacity-50">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="w-full rounded-md bg-[#070809] p-3 outline-none"
                            />
                        </div>

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
                            <button
                                onClick={(e) => _toggleShowPassword(e, "normal")}
                                className="hover:opacity-80"
                            >
                                {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                            </button>
                        </div>

                        {/* confirm password input  */}
                        <div className="flex resize-none flex-row items-center justify-between rounded-md border border-[#30373d] pr-3 text-[1.1rem] text-[#ececf1] disabled:opacity-50">
                            <input
                                type={showCPassword ? "text" : "password"}
                                name="password"
                                placeholder="Confirm Password"
                                className="w-full rounded-md bg-[#070809] p-3 outline-none"
                            />
                            <button
                                onClick={(e) => _toggleShowPassword(e, "confirm")}
                                className="hover:opacity-80"
                            >
                                {showCPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                            </button>
                        </div>

                        {/* login button */}
                        <button
                            type="submit"
                            className="flex items-center justify-center rounded-md bg-[#eb9722] p-3 text-[1.1rem] text-zinc-50 hover:opacity-80"
                        >
                            Sign Up
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
                            onClick={_handleGoogleSignin}
                        >
                            Sign Up with Google
                            <FcGoogle className="mt-0.5 text-2xl" />
                        </button>
                    </form>
                    <p className="text-md mt-7 text-zinc-300">
                        Already have an account?{" "}
                        <Link href="/auth/signin" className="text-[#eb9722] hover:opacity-80">
                            Sign In
                        </Link>
                    </p>
                </div>
            </section>
        </>
    );
};

export default SignUp;
