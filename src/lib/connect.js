// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

// function to connect to the MongoDB client
async function connectMongo() {
    try {
        // Connect the client to the server
        const { connection } = await mongoose.connect(process.env.MONGODB_URI);

        // check ready state and return promise
        if (connection.readyState === 1) {
            return Promise.resolve(true);
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export default connectMongo;
