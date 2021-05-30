const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
// Secure imports
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
// const csrfProtection = csurf({ cookie: { httpOnly: true } });
const session = require("express-session");

// Import Routes
const userRoute = require("./routes/user");
// const postRoute = require("./routes/posts");
const barberRoute = require("./routes/barber");
const eventsRoute = require("./routes/events");
dotenv.config();

// Connect To DataBase
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
  // .then(() => {
  //   console.log("Connected to DB");
  // }).catch(err => console.log(err))
  // console.log("Connected to DB");
);
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }))

//MiddleWare
app.use(express.json()); // Now i can send post requests.
app.use(cookieParser());

//Route MiddleWares
app.use("/api/", userRoute);
app.use("/api/", barberRoute);
app.use("/api/", eventsRoute);
// app.use("/api/posts", postRoute);

// app.get("/cookiesTest", csrfProtection, (req, res) => {
//   // res.cookie("simpletest", "qwerty", { httpOnly: true })

//   res.send(`<form action="/transfer-money" method="POST">
//     <input type="text" name="amount" placeholder="amount">
//     <input type="text" name="to" placeholder="Send to...">
//     <input type="hidden" name="_csrf" value="${req.csrfToken()}">
//     <button>Submit</button>
//   </form>`);
// });

// app.post("/transfer-money", csrfProtection, (req, res) => {
//   if (req.cookies.simpletest === "qwerty") {
//     res.send("Success!");
//   } else {
//     res.send("Failed!");
//   }
// });

// app.use((err, req,res ,next)=>{
//   if (err.code !== "EBADCSRFTOKEN") return next(err);
//   res.status(403);
//   res.send("CSRF attack detected");
// });


// app.use(
//   session({
//     // You could actually store your secret in your .env file - but to keep this example as simple as possible...
//     secret: "supersecret difficult to guess string",
//     cookie: {},
//     resave: false,
//     saveUninitialized: false
//   })
// )
// app.use(csurf())

// app.get("/sessions", (req, res) => {
//   let name = "Guest"

//   if (req.session.user) name = req.session.user

//   res.send(`
//   <h1>Welcome, ${name}</h1>
//   <form action="/choose-name" method="POST">
//     <input type="text" name="name" placeholder="Your name" autocomplete="off">
//     <input type="hidden" name="_csrf" value="${req.csrfToken()}">
//     <button>Submit</button>
//   </form>
//   <form action="/logout" method="POST">
//     <input type="hidden" name="_csrf" value="${req.csrfToken()}">
//     <button>Logout</button>
//   </form>
//   `)
// })

// app.post("/choose-name", (req, res) => {
//   req.session.user = req.body.name.trim()
//   res.send(`<p>Thank you</p> <a href="/sessions">Back home</a>`)
// })

// app.post("/logout", (req, res) => {
//   req.session.destroy(err => {
//     res.redirect("/sessions")
//   })
// })

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("barber_app/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../barber_app", "build", "index.html")
    );
  });
}
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
