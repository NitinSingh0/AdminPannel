const express = require("express");
const Report = require("../models/report");
const Post = require("../models/post");
const User = require("../models/User"); // Ensure you have a User model
const router = express.Router();

// Create a Report
router.post("/create", async (req, res) => {
  try {
    const { postId, reportedBy, reason } = req.body;

    if (!postId || !reportedBy || !reason) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newReport = new Report({ postId, reportedBy, reason });
    await newReport.save();

    res.json({ success: true, message: "Report submitted successfully" });
  } catch (error) {
    console.error("Error reporting post:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get All Reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("postId")
      .populate("reportedBy", "username email"); // Fetch user details

    res.json({ success: true, reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Report by ID
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate("postId")
      .populate("reportedBy", "username email");

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }

    res.json({ success: true, report });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



// DELETE Post and its related Reports
router.delete("/delete-post/:postId/delete", async (req, res) => {
  try {
    const { postId } = req.params;

    // Delete the post
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Delete all reports related to this post
    await Report.deleteMany({ postId });

    res.json({
      success: true,
      message: "Post and related reports deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});



// Mark Report as Checked
router.put("/:id/mark-checked", async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { report_status: "checked" },
      { new: true }
    );

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }

    res.json({ success: true, message: "Report marked as checked", report });
  } catch (error) {
    console.error("Error updating report status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
