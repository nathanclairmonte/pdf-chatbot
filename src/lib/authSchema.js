import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    providerType: String,
    name: String,
    email: String,
    password: String,
    authorized: Boolean,
});

const Users = models.user || model("user", userSchema);

export default Users;
