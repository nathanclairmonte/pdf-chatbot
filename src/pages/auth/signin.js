import Head from "next/head";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormikTextInput, FormikPasswordInput } from "@/components/list";

const SignIn = () => {
    // state
    const [showPassword, setShowPassword] = useState(false);

    // function to toggle show password
    const toggleShowPassword = (event) => {
        // prevent browser refresh
        event.preventDefault();

        // toggle show password
        setShowPassword(!showPassword);
    };

    // function to handle google signin
    const _handleGoogleSignin = async () => {
        signIn("google", { callbackUrl: "http://localhost:3000/" });
    };

    return (
        <>
            <Head>
                <title>Sign In</title>
            </Head>
            <section className="flex h-screen">
                <div className="m-auto flex h-4/5 w-3/5 max-w-lg flex-col items-center justify-evenly gap-5 rounded-md border border-gray-700 p-8">
                    <h1 className="text-2xl text-zinc-50">Sign In</h1>
                    {/* Formik */}
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email("Invalid email address")
                                .required("Email is required"),
                            password: Yup.string()
                                .min(8, "Password must be at least 8 characters long.")
                                .required("Password is required."),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 2000);
                        }}
                    >
                        <Form className="flex w-full flex-col gap-5">
                            {/* email input */}
                            <Field name="email">
                                {({ field, meta }) => (
                                    <>
                                        <div
                                            className={`resize-none rounded-md ${
                                                meta.touched && meta.error
                                                    ? "border-2 border-red-600"
                                                    : "border border-[#30373d]"
                                            } text-[1.1rem] text-[#ececf1] disabled:opacity-50`}
                                        >
                                            <input
                                                type="text"
                                                {...field}
                                                placeholder="Email"
                                                className="w-full rounded-md bg-[#070809] p-3 outline-none"
                                            />
                                        </div>
                                        {meta.touched && meta.error && (
                                            <div className="error -mt-4 ml-2 text-red-600">
                                                {meta.error}
                                            </div>
                                        )}
                                    </>
                                )}
                            </Field>
                            {/* <FormikTextInput name="email" type="email" placeholder="Email" /> */}

                            {/* password input  */}
                            <Field name="password">
                                {({ field, meta }) => (
                                    <>
                                        <div
                                            className={`flex resize-none flex-row items-center justify-between rounded-md ${
                                                meta.touched && meta.error
                                                    ? "border-2 border-red-600"
                                                    : "border border-[#30373d]"
                                            } pr-3 text-[1.1rem] text-[#ececf1] disabled:opacity-50`}
                                        >
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                {...field}
                                                placeholder="Password"
                                                className="w-full rounded-md bg-[#070809] p-3 outline-none"
                                            />
                                            <button
                                                onClick={toggleShowPassword}
                                                className="hover:opacity-80"
                                            >
                                                {showPassword ? (
                                                    <BsFillEyeFill />
                                                ) : (
                                                    <BsFillEyeSlashFill />
                                                )}
                                            </button>
                                        </div>
                                        {meta.touched && meta.error && (
                                            <div className="error -mt-4 ml-2 text-red-600">
                                                {meta.error}
                                            </div>
                                        )}
                                    </>
                                )}
                            </Field>
                            {/* <FormikPasswordInput name="password" placeholder="Password" /> */}

                            <button type="submit">Login</button>
                        </Form>
                    </Formik>
                </div>
            </section>
        </>
    );

    return (
        <>
            <Head>
                <title>Sign In</title>
            </Head>
            <section className="flex h-screen">
                <div className="m-auto flex h-3/4 w-3/5 max-w-lg flex-col items-center justify-evenly gap-5 rounded-md border border-gray-700 p-8">
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
                            onClick={_handleGoogleSignin}
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
