const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  fullName: { type: String, required: true },
    email: { type: String, reuired: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
  bookmarkedPolls:[{type:mongoose.Schema.Types.ObjectId , ref:"Poll"}],
},{timestamps:true});

//Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//compare passwords
UserSchema.methods.comparePassword = async function (candidatePAssword) {
    return await bcrypt.compare(candidatePAssword, this.password);
};

module.exports = mongoose.model('User', UserSchema);