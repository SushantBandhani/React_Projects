const express = require("express");
const server = express();
const mongoose = require("mongoose");
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands');
const userRouter=require('./routes/User')
const authRouter=require('./routes/Auth')
const cartRouter=require('./routes/Cart')
const orderRouter=require('./routes/Order')
const cors=require("cors")
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
server.use(cors(
  {
    exposedHeaders:['X-Total-Count']
  }
))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/brands', brandsRouter.router);
server.use('/users', userRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart', cartRouter.router);
server.use('/order', orderRouter.router);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
