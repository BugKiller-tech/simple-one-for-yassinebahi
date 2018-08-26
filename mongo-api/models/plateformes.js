const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plateformeSchema = new Schema(
  {
    messageType: String,
    platform: {
      device: String,
      manufacturer: String,
      model: String,
      system: String,
      version: String
    }
  },
  { collection: 'PLATFORME_COLLEC' }
);

const Plateforme = mongoose.model('plateforme', plateformeSchema);

module.exports = Plateforme;
