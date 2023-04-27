import connectMongo from "@/lib/connect";
import Users from "@/lib/authSchema";
import { compare } from "bcryptjs";

export const signinUser = async (userInputEmail, userInputPassword) => {
    // output variable
    const output = { user: null, error: null };

    // connect to MongoDB instance
    connectMongo().catch((error) => {
        output.error = `Connection failed :( \n ${error})`;
        return;
    });

    // ensure user exists
    const user = await Users.findOne({ email: userInputEmail });
    if (!user) {
        // throw new Error("No user found with that email. Please sign up first!");
        output.error = "No user found with that email. Please sign up first!";
        return;
    }

    // if user exists, compare password with hash in DB
    const checkPassword = await compare(userInputPassword, user.password);

    // throw error if incorrect password or email (not specifying exactly which for security)
    if (!checkPassword || user.email !== userInputEmail) {
        // throw new Error("Username or password is incorrect.");
        output.error = "Username or password is incorrect.";
        return;
    }

    // if all checks pass, return user
    return { ...output, user };
};
