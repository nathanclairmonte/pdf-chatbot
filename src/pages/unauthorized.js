import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Unauthorized = () => {
    // get auth session
    const { data: session } = useSession();

    // sign user out if they are signed in.
    useEffect(() => {
        if (session) {
            signOut();
        }
    }, [session]);
    return <div>BANNED!</div>;
};

export default Unauthorized;
