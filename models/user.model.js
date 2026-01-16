import mongoose from "mongoose";
import userSchema from "../schemas/user.schema.js";

mongoose.pluralize(null);

const userModel = mongoose.model("students", userSchema);

export default userModel;