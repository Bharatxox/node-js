const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
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
  },
});

// Create the User model based on the schema
module.exports = mongoose.model("Contact", contactSchema);
