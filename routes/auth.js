const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

router.get("/Users/getAllUsers", async (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/Users/register", async (req, res) => {
  // VALIDATE DATA
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({message: error.details[0].message});

  // Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send({message:"Email already exist"});

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // Create a new user
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword,
    // phone: req.body.phone,
    phoneNumberSelected1: req.body.phoneNumberSelected1,
    phone_digits: req.body.phone_digits,
    type: req.body.type
  });
  try {
    const savedUser = await user.save();
    res.send({
      user_id: savedUser._id,
      user_first_name: savedUser.first_name,
      user_last_name: savedUser.last_name,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});


router.post("/Users/login", async (req, res) => {
  // VALIDATE DATA
  const { error } = loginValidation(req.body);
  if (error) return send.status(400).send(error);

  // Checking if the email exist.
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(204).send("Email is not found");

  //PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(204).send("Password is wrong");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.json({
    status: "ok",
    header: token,
    data: user,
  });
  // res.header("auth-token", token).send(token);
});

module.exports = router;
