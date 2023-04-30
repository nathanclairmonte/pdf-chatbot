import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import connectMongo from "@/lib/connect";
// import Users from "@/lib/authSchema";
// import { compare } from "bcryptjs";
import { nextAuthSigninCallback, signinUser } from "@/lib/authUtils";

export const authOptions = {
    // Configure callbacks
    callbacks: {
        async signIn(signInProps) {
            return nextAuthSigninCallback(signInProps);
        },
    },
    // Configure authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            // credentials: {},
            async authorize(credentials, _) {
                console.log("start of authorize() function\n");
                try {
                    const { email, password } = credentials;
                    const { user, error } = await signinUser(email, password);
                    if (error) throw new Error(error);
                    return user;
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    // pages: {
    //     signIn: "/auth/signin"
    // }
};

export default NextAuth(authOptions);
