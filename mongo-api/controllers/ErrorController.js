const RequestErrors = require('../models/RequestErrors');
module.exports = {
  all: async (req, res) => {
    RequestErrors.find().then(errors => {
      res.send(errors)
    })
  }
}