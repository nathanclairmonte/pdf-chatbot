import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BsFill1SquareFill, BsFill2SquareFill, BsFill3SquareFill } from "react-icons/bs";

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
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="flex flex-col items-start justify-center gap-10 rounded-xl border border-sky-300 px-8 py-10">
                <h1 className="text-left text-5xl font-bold text-zinc-300">
                    Sign up successful! 🥳
                </h1>
                <p className="text-left text-xl text-zinc-400">
                    To sign in and get started chatting with your own PDFs, your account needs to be
                    approved first. Here's what you need to do:
                </p>
                <ul className="ml-5 list-inside space-y-2 text-xl text-zinc-400">
                    <li className="flex items-start gap-4">
                        <div className="w-6">
                            <BsFill1SquareFill size={24} className="mr-4 mt-1 text-sky-300" />
                        </div>
                        <p>
                            Contact me{" "}
                            <Link
                                href="mailto:nathanclairmonte@outlook.com"
                                className="text-[#eb9722] hover:opacity-80"
                            >
                                via email
                            </Link>{" "}
                            (or otherwise) and let me know you'd like to be approved.
                        </p>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="w-6">
                            <BsFill2SquareFill size={24} className="mr-4 mt-1 text-sky-300" />
                        </div>
                        <p>
                            Send me the email address you signed up with (or your Gmail address if
                            you signed up with Google).
                        </p>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="w-6">
                            <BsFill3SquareFill size={24} className="mr-4 mt-1 text-sky-300" />
                        </div>
                        <p>Wait for me to let you know when you've been approved!</p>
                    </li>
                    <li className="flex items-start gap-4">
                        <p className="mx-1 mt-6">
                            (Approvals are being done manually at the moment, so please give me a
                            bit of time to get it done.)
                        </p>
                    </li>
                </ul>
                <p className="text-left text-xl text-zinc-400">
                    While you wait, feel free to try{" "}
                    <Link href="/" className="text-[#eb9722] hover:opacity-80">
                        chatting with our sample PDFs
                    </Link>
                    !
                </p>
            </div>
        </main>
    );
};

export default Unauthorized;
