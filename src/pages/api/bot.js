import { setTimeout as sleep } from "timers/promises";

export default async function handler(req, res) {
    // dummy function for now

    await sleep(2000);

    let output;

    if (req.body.query == "hello") {
        output = "Hi there!";
    } else if (req.body.query === "wuz d vibe?") {
        output = "FREE THUGGERRRRR!!!!!! #slatt🐍🐍";
    } else {
        output = req.body.query;
    }

    return res.status(200).json({
        result: {
            type: "success",
            message: output,
        },
    });
}
