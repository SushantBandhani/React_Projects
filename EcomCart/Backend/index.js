const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");
const productRouters=require("./routes/Product")

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

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.use("/products", productRouters.router);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
