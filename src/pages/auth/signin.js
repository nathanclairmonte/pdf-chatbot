import Head from "next/head";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextInput, FormikPasswordInput } from "@/components/list";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const OAUTH_PROVIDERS_STRING = "Google";

// possible authentication errors
const errors = {
    Signin: "Problem signing in. Please try again or try a different account!",
    OAuthSignin: `Problem signing in with ${OAUTH_PROVIDERS_STRING}. Please try again or try signing in with a different account!`,
    OAuthCallback: `Problem signing in with ${OAUTH_PROVIDERS_STRING}. Please try again or try signing in with a different account!`,
    OAuthCreateAccount: `Problem signing in with ${OAUTH_PROVIDERS_STRING}. Please try again or try signing in with a different account!`,
    Callback: "Problem signing in. Please try again or try a different account!",
    OAuthAccountNotLinked:
        "To confirm your identity, sign in with the same account you used originally.",
    CredentialsSignin: "Username or password is incorrect.",
    SessionRequired: "",
    default: "Unable to sign in :(",
};

// translate an error type to its corresponding error message
const getErrorMessage = (errorType) => {
    if (!errorType) return;
    if (errors[errorType]) {
        return errors[errorType];
    } else {
        return errors.default;
    }
};

const SignIn = () => {
    // error message state
    const [errorMessage, setErrorMessage] = useState("");

    // getting potential errors from callback redirect
    const router = useRouter();
    const { error: errorType } = router.query;

    // function to handle credentials signin
    const handleCredentialsSignin = async (values) => {
        // attempt to sign in user
        const status = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/",
        });

        console.log(status);
        if (status.ok) {
            router.push(status.url);
        } else {
            setErrorMessage(getErrorMessage(status.error));
        }
    };

    // function to handle google signin
    const handleGoogleSignin = () => {
        signIn("google", { callbackUrl: "http://localhost:3000/" });
    };

    // populate error message state when errorType changes
    useEffect(() => {
        setErrorMessage(getErrorMessage(errorType));
    }, [errorType]);

    // facilitate login on enter key press
    const handleEnterKeyPress = (event, formikProps) => {
        const { email, password } = formikProps.values;
        if (event.key === "Enter" && email && password) {
            event.preventDefault();
            formikProps.setSubmitting(true);
            formikProps.handleSubmit();
        } else if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    // const errorMessage = getErrorMessage(errorType);
    return (
        <>
            <Head>
                <title>Sign In</title>
            </Head>
            <section className="flex h-screen">
                <div className="m-auto flex h-4/5 w-3/5 max-w-lg flex-col items-center justify-evenly gap-5 rounded-md border border-gray-700 p-8">
                    {/* display error message if we have one */}
                    {errorMessage && (
                        <div className="w-full rounded border border-red-500 p-4 text-center text-base text-red-500">
                            <p>{errorMessage}</p>
                        </div>
                    )}

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
                        // onSubmit={(values, { setSubmitting }) => {
                        //     setTimeout(() => {
                        //         alert(JSON.stringify(values, null, 2));
                        //         setSubmitting(false);
                        //     }, 1000);
                        // }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                handleCredentialsSignin(values);
                                setSubmitting(false);
                            }, 571);
                        }}
                        // onSubmit={(values, { setSubmitting }) => {
                        //     signIn("credentials", {
                        //         redirect: false,
                        //         email: values.email,
                        //         password: values.password,
                        //         callbackUrl,
                        //     });
                        // }}
                    >
                        {(props) => (
                            <Form
                                className="flex w-full flex-col gap-5"
                                onKeyDown={(e) => handleEnterKeyPress(e, props)}
                            >
                                {/* email input */}
                                <FormikTextInput name="email" type="email" placeholder="Email" />

                                {/* password input  */}
                                <FormikPasswordInput name="password" placeholder="Password" />

                                {/* submit button */}
                                <button
                                    type="submit"
                                    className="flex h-[3.15rem] items-center justify-center rounded-md bg-[#eb9722] p-3 text-[1.1rem] text-zinc-50 hover:opacity-80"
                                >
                                    {props.isSubmitting ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        <p>Login</p>
                                    )}
                                </button>

                                {/* content divider */}
                                <div className="relative flex items-center py-3">
                                    <div className="flex-grow border-t border-[#eb9722]"></div>
                                    <span className="mx-4 flex-shrink text-zinc-400">or</span>
                                    <div className="flex-grow border-t border-[#eb9722]"></div>
                                </div>

                                {/* google button */}
                                {/* NB: the 'type="button"' is to make sure this button doesn't submit the
                            email/password form above */}
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-3 rounded-md border border-[#30373d] p-3 text-[1.1rem] text-zinc-50 hover:opacity-80"
                                    // onClick={handleGoogleSignin}
                                    // onClick={() => signIn("google", { callbackUrl }))}
                                    onClick={() => alert("google button clicked")}
                                >
                                    Sign In with Google
                                    <FcGoogle className="mt-0.5 text-2xl" />
                                </button>
                            </Form>
                        )}
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
