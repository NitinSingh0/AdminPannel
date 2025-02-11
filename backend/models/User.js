const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    //username
    username: { type: String },
    name: { type: String, required: true, unique: true },
    email: { type: String, reuired: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
    bookmarkedPolls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],
    profilePicture: { type: String },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    },
    backgroundPicture: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/colored-points-connected-net_1048-12426.jpg?ga=GA1.1.1157197616.1706377125&semt=ais_hybrid",
    },
    bio: {
      type: String,
    },
    course: {
      type: String,
    },
    userRole: {
      type: String,
    },
    passingYear: {
      type: String,
    },
    user_type: {
      type: String,
      enum: ["faculty", "student"],
      default: "student",
    },
    account_status: {
      type: String,
      enum: ["active", "deactivate", "suspended"],
      default: "active",
    },
    online_status: { type: Boolean, default: false },
    joinedDate: { type: Date, default: Date.now },
    sentFollowRequest: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    receivedFollowRequests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    friendRequest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sentFriendRequest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    verified: {
      type: Boolean,
      default: false,
    },
    verficationToken: String,
  },
  { timestamps: true }
);

//Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//compare passwords
UserSchema.methods.comparePassword = async function (candidatePAssword) {
  return await bcrypt.compare(candidatePAssword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
