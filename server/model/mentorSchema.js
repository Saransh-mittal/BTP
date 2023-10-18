const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mentorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    occupation:{
      type: String,
      required: true,
    },
    specialization:{
      type: String,
      required: true,
    },
    phone: 
      {
        type: Number,
        required: true,
      },
    password: 
      {
        type: String,
        required: true,
      },
      cpassword: 
          {
          type: String,
          required: true,
      },
  },
  { collection: "Mentors" }
);

mentorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    //console.log(this.password);
    //console.log("hii from bcrypt");
    const pass = this.password;
    this.password = await bcrypt.hash(pass, 12);
    this.cpassword = await bcrypt.hash(pass, 12);
  }
  next();
});

mentorSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    // this.tokens = this.tokens.concat({ token });
    // await this.save();
    return token;
  } catch (error) {
    console.log(error.message);
  }
};
const Mentor = mongoose.model("MENTOR", mentorSchema);

module.exports = Mentor;
