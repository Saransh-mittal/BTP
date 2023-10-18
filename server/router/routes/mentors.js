const express = require("express");
const router = express.Router();

const Mentor = require("../../model/mentorSchema");

router.get("/", async (req, res) => {
    const { page = 1, pageSize = 9 } = req.query;
    try {
      const mentor = await Mentor.find({}).sort({
        dateTime: -1,
        "sentiments.compound": -1,
      }).skip((page - 1) * pageSize).limit(9);

      if(!mentor)
      {
        res.status(422).json({ error: "No mentors found" });
        //throw new Error("No mentors found");
      }
      res.send(mentor);
    } catch (error) {
      console.log(error.message);
    }
  });

module.exports = router;