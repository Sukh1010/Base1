import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  age: Number,
  name: String,
  gender: String,
  company: String,
  email: String,
  phone: String,
});

export default new mongoose.model("User", userSchema);
