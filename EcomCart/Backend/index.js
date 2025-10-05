const express = require("express");
const server = express();
const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecomcart", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Conected')
  } catch (err) {
    console.log("Error in connecting to database", err);
  }
}

main().catch((err) => console.log(err));

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
