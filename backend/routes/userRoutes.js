const express = require("express");
const User = require("../models/User"); // User model
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user account_status
router.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { account_status } = req.body;

  if (!["active", "deactivate", "suspended"].includes(account_status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
    console.log("ID and status", id);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { account_status },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User status updated", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
