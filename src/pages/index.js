import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { Navbar, MessagesList, QueryInput, PDFInput } from "@/components/list";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home({}) {
    // state
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [docs, setDocs] = useState([]);
    const [apiKey, setApiKey] = useState("");
    const [messages, setMessages] = useState([
        {
            text: "Hey! Load a PDF and then ask a question :)",
            type: "response",
        },
    ]);

    // refs
    const messageListRef = useRef(null);
    const queryInputRef = useRef(null);

    // get auth session
    const { data: session } = useSession();

    // auto scroll chat to bottom whenever messages state changes
    useEffect(() => {
        // put ref into variable (for readability)
        const messageList = messageListRef.current;

        // save current window scroll position
        const prevWinScrollY = window.scrollY;

        // scroll chat to bottom
        messageList.scrollTop = messageList.scrollHeight;

        // refocus on the query input
        queryInputRef.current.focus();

        // restore window scroll position
        window.scrollTo(0, prevWinScrollY);
    }, [messages]);

    // keep history up to date (and doesn't exceed 2 messages in length)
    useEffect(() => {
        if (messages.length > 2) {
            setHistory([messages[messages.length - 2].text, messages[messages.length - 1].text]);
        }
    }, [messages]);

    return (
        <>
            <Head>
                <title>PDF ChatBot</title>
                <meta name="description" content="Made by Nathan Clairmonte." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar apiKey={apiKey} setApiKey={setApiKey} session={session} />
            <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
                <>
                    <PDFInput setDocs={setDocs} setMessages={setMessages} session={session} />
                    <MessagesList
                        messages={messages}
                        messageListRef={messageListRef}
                        loading={loading}
                    />
                    <QueryInput
                        loading={loading}
                        queryInputRef={queryInputRef}
                        history={history}
                        docs={docs}
                        apiKey={apiKey}
                        setLoading={setLoading}
                        setMessages={setMessages}
                    />
                </>

                {/* No longer using this div below because I'm now allowing signed-out users
                to still load and chat with some sample PDFs */}
                {/* <div className="flex flex-row gap-2 text-2xl text-zinc-50">
                    Please{" "}
                    <Link href="/auth/signin" className="text-[#eb9722] hover:opacity-80">
                        Sign in
                    </Link>
                    to use the PDF ChatBot!
                </div> */}
            </main>
        </>
    );
}

// // protect the homepage route. redirect to sign in if no user session exists.
// // (commented out for now so I can test)
// export async function getServerSideProps(context) {
//     const session = await getSession(context.req);

//     if (!session) {
//         return {
//             redirect: {
//                 destination: "/auth/signin",
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: { session },
//     };
// }
