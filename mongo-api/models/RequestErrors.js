const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reqErrorSchema = new Schema(
  {
    content: String,
  },
  { timestamps: true }
);

const RequestErrors = mongoose.model('error', reqErrorSchema);

module.exports = RequestErrors;
