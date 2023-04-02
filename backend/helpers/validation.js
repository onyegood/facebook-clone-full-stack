const User = require("../models/User");

exports.validateEmail = (email) => {
  if (!email) {
    return null;
  }
  return String(email)
    .toLowerCase()
    .trim()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2.12})?$/);
};

exports.validateLength = (input, min, max) => {
  if (input.length > max || input.length < min) {
    return true;
  }
  return false;
}


exports.validateUsername = async (username) => {
  let a = false;

  do{
    let check = await User.findOne({ username });
    if (check) {
      // Change username
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      a = true;
    } else {
      a = false;
    }
  } while (a);

  return username;
}
