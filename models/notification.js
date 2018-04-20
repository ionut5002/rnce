/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose


// Notification Model Definition
const NotificationSchema = new Schema({
  changesTo:{type:String},
  seen:{type:Array},
  author: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Export Module/Schema
module.exports = mongoose.model('Notification', NotificationSchema);
