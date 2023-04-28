import Head from "next/head";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormikTextInput, FormikPasswordInput } from "@/components/list";
import { signIn } from "next-auth/react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";

const SignUp = () => {
    // error message state
    const [errorMessage, setErrorMessage] = useState("");

    // router object so we can redirect after signup
    const router = useRouter();

    // function to handle credentials signup
    const handleCredentialsSignup = async (values) => {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password,
                authorized: false, // new users unauthorized by default
            }),
        });
        // const data = response.json();

        // redirect to unauthorized if successful, show error message if not
        // redirecting to unauthorized here because new users by default are unauthorized
        if (response.ok) {
            router.push("/unauthorized");
        } else {
            const error = JSON.parse(await response.text()).error;
            setErrorMessage(error);
        }
    };

    // function to handle google signup
    const handleGoogleSignup = async () => {
        signIn("google", { callbackUrl: `${process.env.NEXTAUTH_URL}/` });
    };

    // facilitate form submit on enter key press
    const handleEnterKeyPress = (event, formikProps) => {
        const { name, email, password, confirmPassword } = formikProps.values;
        if (event.key === "Enter" && name && email && password && confirmPassword) {
            event.preventDefault();
            formikProps.setSubmitting(true);
            formikProps.handleSubmit();
        } else if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <section className="flex h-screen">
                <div className="m-auto flex w-3/5 max-w-lg flex-col items-center justify-evenly gap-5 rounded-md border border-gray-700 p-8">
                    {/* display error message if we have one */}
                    {errorMessage && (
                        <div className="w-full rounded border border-red-500 p-4 text-center text-base text-red-500">
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    <h1 className="text-2xl text-zinc-50">Sign Up</h1>
                    {/* Formik */}
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required("Name is required."),
                            email: Yup.string()
                                .email("Invalid email address")
                                .required("Email is required."),
                            password: Yup.string()
                                .min(8, "Password must be at least 8 characters long.")
                                .required("Password is required."),
                            confirmPassword: Yup.string()
                                .oneOf([Yup.ref("password"), null], "Passwords must match.")
                                .required("Passwords must match."),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                // alert(JSON.stringify(values, null, 2));
                                handleCredentialsSignup(values);
                                setSubmitting(false);
                            }, 571);
                        }}
                    >
                        {(props) => (
                            <Form
                                className="flex w-full flex-col gap-5"
                                onKeyDown={(e) => handleEnterKeyPress(e, props)}
                            >
                                {/* name input */}
                                <FormikTextInput name="name" type="text" placeholder="Full Name" />

                                {/* email input */}
                                <FormikTextInput name="email" type="email" placeholder="Email" />

                                {/* password input  */}
                                <FormikPasswordInput name="password" placeholder="Password" />

                                {/* confirm password input  */}
                                <FormikPasswordInput
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                />

                                {/* submit button */}
                                <button
                                    type="submit"
                                    className="flex h-[3.15rem] items-center justify-center rounded-md bg-[#eb9722] p-3 text-[1.1rem] text-zinc-50 hover:opacity-80"
                                >
                                    {props.isSubmitting ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        <p>Sign Up</p>
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
                                    // onClick={handleGoogleSignup}
                                    onClick={() => alert("google button clicked")}
                                >
                                    Sign Up with Google
                                    <FcGoogle className="mt-0.5 text-2xl" />
                                </button>
                            </Form>
                        )}
                    </Formik>
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
