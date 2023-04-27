// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

// // ********** v1 - using MongoClient **********
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.MONGODB_URI);

// // function to connect to the MongoDB client
// async function connectMongo() {
//     try {
//         // Connect the client to the server
//         const { connection } = await client.connect();

//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         // console.log("Pinged your deployment. You successfully connected to MongoDB!");

//         // check ready state and return promise
//         if (connection.readyState === 1) {
//             return Promise.resolve(true);
//         }
//     } catch (error) {
//         return Promise.reject(error);
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }

// ********** v2 - using mongoose **********

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
