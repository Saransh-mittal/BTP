const express = require('express');
const router = express.Router();
const Mentor = require('../../model/mentorSchema');
// Handle signup route
router.post('/register_mentor', async (req, res) => {
  //console.log(req.body);
  const { firstName, lastName ,email, phone, password, cpassword, occupation, specialization } = req.body;

  if (!firstName || !email || !phone || !lastName || !password || !cpassword || !occupation || !specialization)
    return res.status(422).json({ error: "Please fill the required field" });

  try {
    const response = await Mentor.findOne({ email: email });
    if (response)
      return res.status(422).json({ error: "Email already exists" });
    if (password != cpassword)
      return res
        .status(422)
        .json({ error: "password is not equal to confirm password" });
    if (phone.toString().length != 10) {
      return res
        .status(422)
        .json({ error: "Phone no. should be of 10 digits" });
    }
    const mentor = new Mentor({ firstName, lastName ,email, phone, password, cpassword, occupation, specialization });
    await mentor.save();
    return res.status(201).json({ message: "Registered Successfully" });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
