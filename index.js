const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');

// Import Routes
const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");
const barberRoute = require('./routes/barber');
const eventsRoute = require('./routes/events');
dotenv.config();

// Connect To DataBase
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true, useFindAndModify: false }
  // .then(() => {
  //   console.log("Connected to DB");
  // }).catch(err => console.log(err))
  // console.log("Connected to DB");
);
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})
app.use(bodyParser.json());
app.use(cors());

//MiddleWare
app.use(express.json()); // Now i can send post requests.

//Route MiddleWares
app.use("/api/", authRoute);
app.use("/api/", barberRoute);
app.use("/api/", eventsRoute);
// app.use("/api/posts", postRoute);


// Serve static assets if in production
// if (process.env.NODE_ENV === 'production'){
//   // Set static folder
//   app.use(express.static('barber_app/build'));
//   app.get('*', (req, res)=>{
//     res.sendFile(path.resolve(__dirname, '../barber_app', 'build', 'index.html'));
//   })
// }
app.listen(PORT, () => {
  console.log("Server up and running");
});
