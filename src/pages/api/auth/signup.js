import connectMongo from "@/lib/connect";
import Users from "@/lib/authSchema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
    // output variable
    const output = { user: null, error: null, ok: false };

    // connect to our MongoDB instance
    connectMongo().catch((error) =>
        res.json({ ...output, error: `Connection failed :( \n ${error})` })
    );

    // accept only POST requests
    if (req.method === "POST") {
        // ensure we have user input
        if (!req.body) {
            return res.status(404).json({ ...output, error: "No form data given." });
        }

        // get data from user input
        const { name, email, password, authorized } = req.body;

        // check duplicate users by email
        const existingUsersEmail = await Users.findOne({ email });
        if (existingUsersEmail) {
            console.log({ ...output, error: "User with that email address already exists." });
            return res
                .status(422)
                .json({ ...output, error: "User with that email address already exists." });
        }

        // hash password
        // NB: bcrypt handles the salting and hashing for us in one function.
        //     All we need to define is the "cost" of the hashing.
        //     (defined through our BCRYPT_SALTROUNDS env var)
        const hashedPassword = await hash(password, Number(process.env.BCRYPT_SALTROUNDS));

        // Save user info to database
        try {
            const user = await Users.create({ name, email, authorized, password: hashedPassword });
            return res.status(201).json({ ...output, ok: true, user });
        } catch (error) {
            return res
                .status(404)
                .json({ ...output, error: `Something went wrong :( \n ${error}` });
        }
    } else {
        return res.status(500).json({
            ...output,
            error: `HTTP method ${req.method} not valid. Only POST requests are allowed.`,
        });
    }
}
