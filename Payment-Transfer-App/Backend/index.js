const express=require("express")
const {User,connectDB}=require("./db")
const cors=require('cors')
const app= express()
const mainRouter=require("./routes/index")
// In server.js or app.js (entry file)
require('dotenv').config(); // Load environment variables

const PORT=3000;
connectDB();


// Middleware
app.use(cors())
app.use(express.json());
app.use("/api/v1",mainRouter);


// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.listen(3000,()=>{
    console.log("Listening at PORT 3000");
})