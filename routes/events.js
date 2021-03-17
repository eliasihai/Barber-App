const router = require("express").Router();
const Event = require("../model/Events");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { registerValidation, loginValidation } = require("../validation");

router.get("/Events/AllEvents", (req, res) => {
  Event.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/Events/CreateEvent", async (req, res) => {
  // VALIDATE DATA
  // const { error } = registerBarberValidation(req.body);
  // if (error) return res.status(400).send({message: error.details[0].message});

  // // Checking if the barber is already in the database
  // const emailExist = await Barber.findOne({ email: req.body.email });
  // if (emailExist) return res.status(400).send({message:"Email already exist"});

  // Create a new barber
  const event = new Event({
    // barberID: req.body.barberID,
    // userID: req.body.userID,
    // barberName: req.body.barberName,
    // userName: req.body.userName,
    // date: req.body.date,
    // start: req.body.start,
    // end: req.body.end,
    id: req.body.id,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end
  });
  try {
    const savedEvent = await event.save();
    res.send({
      savedEvent,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
