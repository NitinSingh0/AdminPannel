const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const User = require("../models/User");
const Post = require("../models/post");
const Report = require("../models/report");
const Poll = require("../models/Poll");
const router = express.Router();

router.get("/user-analytics", async (req, res) => {
  try {
    const usersByMonth = await User.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$joinedDate" }, // Extract month
            year: { $year: "$joinedDate" }, // Extract year
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }, // Sort by year and month
    ]);

    res.json({ usersByMonth });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user analytics" });
  }
});

router.get("/post-analytics", async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();

    const postsByMonth = await Post.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" }, // Extract month
            year: { $year: "$createdAt" }, // Extract year
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }, // Sort by year and month
    ]);

    res.json({ totalPosts, postsByMonth });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post analytics" });
  }
});

router.get("/poll-analytics", async (req, res) => {
  try {
    const totalPolls = await Poll.countDocuments();

    const pollsByMonth = await Poll.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" }, // Extract month
            year: { $year: "$createdAt" }, // Extract year
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }, // Sort by year and month
    ]);

    res.json({ totalPolls, pollsByMonth });
  } catch (error) {
    res.status(500).json({ message: "Error fetching poll analytics" });
  }
});

router.get("/report-analytics", async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const checkedReports = await Report.countDocuments({
      report_status: "checked",
    });
    const uncheckedReports = await Report.countDocuments({
      report_status: "not-checked",
    });

    const reportsByMonth = await Report.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$reportedAt" }, // Extract month
            year: { $year: "$reportedAt" }, // Extract year
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }, // Sort by year and month
    ]);

    res.json({
      totalReports,
      checkedReports,
      uncheckedReports,
      reportsByMonth,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching report analytics" });
  }
});
module.exports = router;