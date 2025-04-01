const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser=require('body-parser');
const frimRoutes=require("./routes/firmRoutes")
const productRoutes=require("./routes/productRoutes");
const cors=require("cors");
const path=require('path');

dotenv.config();  // Load environment variables from the .env file

const app = express();
app.use(cors())
const PORT = 4000;



// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected successfully"))
  .catch((e) => console.log(e));

// Routes
app.use(bodyParser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm',frimRoutes);
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))

// Additional route
app.use('/home', (req, res) => {
  res.send("<h1>Welcome to Sekhar</h1>");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started and running at port ${PORT}`);
});
