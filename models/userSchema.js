const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String },
  password: { type: String, required: true },
},{
  versionKey:false,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel};