const express = require("express");

const {
  registerUser,
  loginUser,
  getUserInfo,
  addUser,
} = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/register", registerUser);
router.post("/add-user", addUser);
router.post("/login", loginUser);
router.get("/getUser",protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });

    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });


})
module.exports = router