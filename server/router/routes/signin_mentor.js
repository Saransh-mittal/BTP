const express = require('express');
const router = express.Router();
const Mentor = require('../../model/mentorSchema');
const bcrypt = require("bcryptjs");
// Handle login route
router.post('/login_mentor', async (req, res) => {
  // Implement login logic here
  //console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).json({ error: "Please fill the required field" });

  try {
    const findMentor = await Mentor.findOne({ email: email });
    //console.log(findUser);
    if (!findMentor)
      return res.status(422).json({ error: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, findMentor.password);
    if (!isMatch) return res.status(422).json({ error: "Invalid Credentials" });
    const token = await findMentor.generateAuthToken();
    // console.log(token);
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 2592000000),
      httpOnly: true,
    });

    return res.status(201).json({ message: "SignIn Successfull" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
