import mongoose from "mongoose";

async function connectdb() {
  mongoose
    .connect(
      "mongodb+srv://Sukh99:mongodb@cluster0.qeqp1.mongodb.net/base?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("mongodb connected");
    });
}

export default connectdb;
