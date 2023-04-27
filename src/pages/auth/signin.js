import Head from "next/head";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextInput, FormikPasswordInput } from "@/components/list";

const SignIn = () => {
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
                                .required("Email is required."),
                            password: Yup.string()
                                .min(8, "Password must be at least 8 characters long.")
                                .required("Password is required."),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 1000);
                        }}
                    >
                        <Form className="flex w-full flex-col gap-5">
                            {/* email input */}
                            <FormikTextInput name="email" type="email" placeholder="Email" />

                            {/* password input  */}
                            <FormikPasswordInput name="password" placeholder="Password" />

                            {/* submit button */}
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
                            {/* NB: the 'type="button"' is to make sure this button doesn't submit the
                            email/password form above */}
                            <button
                                type="button"
                                className="flex items-center justify-center gap-3 rounded-md border border-[#30373d] p-3 text-[1.1rem] text-zinc-50 hover:opacity-80"
                                // onClick={_handleGoogleSignin}
                                onClick={() => alert("google button clicked")}
                            >
                                Sign In with Google
                                <FcGoogle className="mt-0.5 text-2xl" />
                            </button>
                        </Form>
                    </Formik>
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
