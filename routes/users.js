const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/ebook");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that each email is unique in the collection
    trim: true, // Trims whitespace from the beginning and end of the email
    lowercase: true, // Converts the email to lowercase
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, // Basic email format validation
  },

  msg: {
    type: String,
   
    // Assumes a 10-digit phone number format
  },
});

// Create the User model based on the schema
module.exports = mongoose.model("User", userSchema);
