import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Unauthorized = () => {
    // get auth session
    const { data: session } = useSession();

    // sign user out if they are signed in.
    useEffect(() => {
        if (session) {
            signOut();
        }
    }, [session]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 border border-white p-24 text-zinc-50">
            <h1 className="text-center text-6xl">Sign in/sign up successful!</h1>
            <h2 className="text-center text-2xl">
                Now you just need to be approved, please{" "}
                <Link
                    href="mailto:nathanclairmonte@outlook.com"
                    className="text-[#eb9722] hover:opacity-80"
                >
                    contact Nathan
                </Link>{" "}
                to get your account approved.
            </h2>
            <h2 className="text-center text-xl">
                In the meantime, feel free to try{" "}
                <Link href="/" className="text-[#eb9722] hover:opacity-80">
                    chatting with our sample PDFs
                </Link>
                !
            </h2>
        </main>
    );
};

export default Unauthorized;
