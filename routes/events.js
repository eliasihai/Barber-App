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

// Get Events by barber ID
router.get("/Events/:barberID", (req, res) => {
  try {
    //const lecture = req.params.studentID;
    Event.find(
      { barberID: req.params.barberID },
      function (err, event1) {
        res.json({
          status: "ok",
          data: event1,
        });
      }
    );
  } catch (err) {
    res.json({ message: "err: " + err });
  }
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
    barberID: req.body.barberID,
    userID: req.body.userID,
    barberName: req.body.barberName,
    userName: req.body.userName,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    // date: req.body.date,
    // start: req.body.start,
    // end: req.body.end,
    // id: req.body.id,
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
