import connectMongo from "@/lib/connect";
import Users from "@/lib/authSchema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
    // res.json({ message: "Sign up POST request" });

    connectMongo().catch((error) => res.json({ error: `Connection failed :( \n ${error})` }));

    // accept only POST requests
    if (req.method === "POST") {
        // ensure we have user input
        if (!req.body) {
            return res.status(404).json({ error: "Don't have form data! " });
        }

        // get data
        const { username, email, password } = req.body;

        // check duplicate users by email
        const existingUsersEmail = await Users.findOne({ email });
        if (existingUsersEmail) {
            return res
                .status(422)
                .json({ message: "User with that email address already exists." });
        }

        // check duplicate users by username
        const existingUsersUsername = await Users.findOne({ username });
        if (existingUsersUsername) {
            return res.status(422).json({ message: "User with that username already exists." });
        }

        // hash password (need to install bcryptjs)
        // NB: BCrypt handles the salting and hashing for us in one function.
        //     All we need to define is the "cost" (defined through our BCRYPT_SALTROUNDS env var)
        const hashedPassword = await hash(password, Number(process.env.BCRYPT_SALTROUNDS));

        // Save user info to database
        try {
            const user = await Users.create({ username, email, password: hashedPassword });
            return res.status(201).json({ status: true, user });
        } catch (error) {
            return res.status(404).json({ error: `Something went wrong :( \n ${error}` });
        }
    } else {
        return res.status(500).json({ message: "HTTP method not valid. Only POST accepted." });
    }
}
