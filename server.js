//  const express = require("express");
// const data = require("./data.json");
// var fs = require("fs");
// const User = require("./Model/userModel.js");
import express from "express";
import User from "./Model/userModel.js";
// const connectdb = require("./");
import connectdb from "./dbConnection.js";
import userData from "./data.js";
const app = express();
app.use(express.json());
connectdb();

app.get("/users", async (req, res) => {
  try {
    // let data = await User.find({ age: { $gt: 22 } }).select({ name: 0 });
    // let data = await User.find({age : { $in : [19,20,22,25]}});
    // let data = await User.find({ age: { $in: [19, 20, 22, 25] } });
    // let data = userData
    //   .filter(
    //     (person) => person.name === "Massey Padilla" && person.age % 2 == 1
    //   )
    //   .map((person) => person.name);

    const dataLimit = await User.find()
      .limit(req.query.limit || 3)
      .skip(req.query.page || 0);

    res.status(200).send({ dataLimit });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.get("/user/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await User.findById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.post("/user", async (req, res) => {
  try {
    let result = await User.create(req.body);
    res.status(201).send(result);
  } catch (error) {
    res.send(error.message);
  }
});

// function insertuserData() {
//   User.insertMany(userData).then((res) => console.log("data is inserted"));
// }
// insertuserData();

app.put("/user/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let result = await User.findByIdAndUpdate(id, req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//delete

app.delete("/user/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let result = await User.findByIdAndRemove(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// console.log(__dirname, "dirname");

// fs.readFile("./data.json", "utf8", (err, data) => {
//   if (err) {
//     console.log("File read failed:", err);
//     return;
//   }
//   let result = data.filter((arr) => arr === "Whitaker Jenkins");
//   console.log(result);
//   console.log("File data:", data);
// });

app.listen(8000, () => {
  console.log("server is running");
});

// const people = [
//   { name: "John", age: 20 },
//   { name: "Sarah", age: 25 },
//   { name: "Mike", age: 31 },
//   { name: "Emily", age: 28 },
//   { name: "David", age: 19 }
// ];

// const namesWithOddAge = people.filter(person => person.age % 2 !== 0).map(person => person.name);

// console.log(namesWithOddAge);
