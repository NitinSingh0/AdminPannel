const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Poll = require("../models/Poll");

//Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Register User
exports.registerUser = async (req, res) => {
  const { name, username, email, password, profileImageUrl } = req.body;

  //validation:check for missing field
  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //Validation: Check username format
  //Allows alphabet character and hyphen only
  const usernameRegex = /^[a-zA-Z0-9-]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message:
        "Invalid username.Only alphanumeric characters and hyphens are allowed. No spaces are permitted.",
    });
  }
  try {
    //check if email alredy exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Username not available. Try another one" });
    }

    //create the user
    const user = await User.create({
      name,
      username,
      email,
      password,
      profileImageUrl,
    });
    res
      .status(201)
      .json({ id: user._id, user, token: generateToken(user._id) });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

//Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  //validation:check for missing field
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //Count polls created by the user
    const totalPollsCreated = await Poll.countDocuments({ creator: user._id });
    //count polls the user has voted in
    const totalPollsVotes = await Poll.countDocuments({
      voters: user._id,
    });
    // Get the count of bookmarked polls
    const totalPollsBookmarked = user.bookmarkedPolls.length;

    res.status(200).json({
      id: user._id,
      user: {
        ...user.toObject(),
        totalPollsCreated,
        totalPollsVotes,
        totalPollsBookmarked,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

//Get User info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "USer not found" });
    }

    //Count polls created by the user
    const totalPollsCreated = await Poll.countDocuments({ creator: user._id });
    //count polls the user has voted in
    const totalPollsVotes = await Poll.countDocuments({
      voters: user._id,
    });
    // Get the count of bookmarked polls
    const totalPollsBookmarked = user.bookmarkedPolls.length;
    //Add the new attribute to the response
    const userInfo = {
      ...user.toObject(),
      totalPollsCreated,
      totalPollsVotes,
      totalPollsBookmarked,
    };
    res.status(200).json(userInfo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};
