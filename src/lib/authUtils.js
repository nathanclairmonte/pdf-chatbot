import connectMongo from "@/lib/connect";
import Users from "@/lib/authSchema";
import { compare } from "bcryptjs";

export const signinUser = async (userInputEmail, userInputPassword) => {
    console.log("start of signinUser() function\n");

    // output variable
    const output = { user: null, error: null };

    // connect to MongoDB instance
    console.log("Connecting to MongoDB from signinUser() function...");
    connectMongo().catch((error) => {
        output.error = `Connection failed :( \n ${error})`;
        return;
    });
    console.log("Successfully connected to MongoDB!\n");

    // ensure user exists
    console.log(`Searching for user with email ${userInputEmail}...`);
    const user = await Users.findOne({ email: userInputEmail });
    console.log("Search complete.");
    if (!user) {
        console.log("No user found");
        // throw new Error("No user found with that email. Please sign up first!");
        output.error = "No user found with that email. Please sign up first!";
        return;
    }
    console.log("User found!\n");

    // if user exists, compare password with hash in DB
    console.log("Comparing password with DB...");
    const checkPassword = await compare(userInputPassword, user.password);

    // throw error if incorrect password or email (not specifying exactly which for security)
    if (!checkPassword || user.email !== userInputEmail) {
        // throw new Error("Username or password is incorrect.");
        output.error = "Username or password is incorrect.";
        return;
    }
    console.log("Password check passed!\n");

    // if all checks pass, return user
    return { ...output, user };
};

export const nextAuthSigninCallback = async ({ user, account, profile }) => {
    console.log("start of nextAuthSigninCallback() function\n");

    // console.log("starting");
    // console.log("user:", user);
    // console.log("account:", account);
    // console.log("profile:", profile);
    // variables for the pages we will redirect to. just for readability.
    const homePage = `${process.env.NEXTAUTH_URL}/`;
    const unauthorizedPage = `${process.env.NEXTAUTH_URL}/unauthorized`;

    // if we didn't get an account.type, something went wrong. redirect to home.
    if (!account.provider || !user) {
        return homePage;
    }

    // connect to MongoDB instance
    console.log("Connecting to MongoDB from nextAuthSigninCallback() function...");
    connectMongo().catch((error) => {
        console.log(`MongoDB connection failed \n ${error}`);
        return homePage;
    });
    console.log("Successfully connected to MongoDB!\n");

    // check if user exists in db
    // console.log("checking db...");
    try {
        console.log(`Searching for user with email ${user.email}...`);
        const dbUser = await Users.findOne({ email: user.email });
        console.log("Search complete.");

        if (dbUser) {
            // if user exists in db, return true if they are authorized to sign in, otherwise redirect to unauthorizedPage
            // (regardless of whether the provider is credentials or oauth)
            // console.log("found user");
            console.log("User found!");
            return dbUser.authorized && dbUser.authorized === true ? true : unauthorizedPage;
        } else {
            console.log("No user found.");
            // console.log("no existing user found");
            // if user doesn't exist in db, check provider type.
            // (NB: might have to update if we add another oauth provider. {user.name} might be called something else.)
            if (account.provider === "credentials") {
                // if credentials type, there's a problem somewhere. user should already exist in db.
                // the user has probably mistyped their email address.
                // return true to let sign in process continue normally, will fail later on (and be caught by frontend)
                return true;
            } else {
                // if oauth type, this is the first time user is signing in. (otherwise they'd exist already in db)
                try {
                    // add user info to db
                    await Users.create({
                        providerType: account.provider,
                        name: `${user.name}`,
                        email: user.email,
                        password: "", // empty password for oauth users
                        authorized: false, // new users unauthorized by default
                    });

                    // return true (to continue sign in flow)
                    return true;
                } catch (error) {
                    // error creating user in DB. halt signin process and return home
                    return homePage;
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};
