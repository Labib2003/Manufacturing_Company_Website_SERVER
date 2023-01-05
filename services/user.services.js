const User = require("../models/User");

module.exports.getAllUsersService = () => User.find({});
module.exports.getUserByEmailService = (email) =>
  User.findOne({ email: email });
module.exports.upsertUserService = (email, data) =>
  User.updateOne({ email: email }, { $set: data }, { upsert: true });
module.exports.updateUserService = (email, data) =>
  User.updateOne({ email: email }, { $set: data });
module.exports.makeUserAdminService = (email) =>
  User.updateOne({ email: email }, { $set: { isAdmin: true } });
