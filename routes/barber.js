const router = require("express").Router();
const Barber = require("../model/Barber");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerBarberValidation, loginValidation } = require("../validation");

router.get("/Barbers/getAllBarbers", async (req, res) => {
  const barbers = await Barber.find()
      .then((barbers) => res.json({status: 'ok',data: barbers}))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  
  router.post("/Barbers/register", async (req, res) => {
    // VALIDATE DATA
    const { error } = registerBarberValidation(req.body);
    if (error) return res.status(400).send({message: error.details[0].message});
  
    // Checking if the barber is already in the database
    const emailExist = await Barber.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send({message:"Email already exist"});
  
    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // Create a new barber
    const barber = new Barber({
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
      const savedBarber = await barber.save();
      res.send({
        barber_id: savedBarber._id,
        barberr_first_name: savedBarber.first_name,
        barber_last_name: savedBarber.last_name,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  
  router.post("/Barbers/login", async (req, res) => {
    // VALIDATE DATA
    const { error } = loginValidation(req.body);
    if (error) return send.status(400).send(error);
  
    // Checking if the email exist.
    const barber = await Barber.findOne({ email: req.body.email });
    if (!barber) return res.status(204).send("Email is not found");
  
    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, barber.password);
    if (!validPass) return res.status(204).send("Password is wrong");
  
    //Create and assign a token
    const token = jwt.sign({ _id: barber._id }, process.env.TOKEN_SECRET);
    res.json({
      status: "ok",
      header: token,
      data: barber,
    });
    // res.header("auth-token", token).send(token);
  });
  
  module.exports = router;