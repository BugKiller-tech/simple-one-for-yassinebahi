const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projetSchema = new Schema(
  {
    control: {
      appId: {
        type: String,
        required: true,
      },
      reportId: Number,
      reportDate: String,
      lastSampleDate: String
    },
    platform: {
      version: String,
      batteryLevel: Number
    },

    network: {
      isRoaming: Boolean,
      networkType: String,
      dataConnection: String,
      simoperator: String,
      countryIso: String,
      networkOperator: String
    },
    traffic: {
      global: {
        packets: {
          tx: Number,
          rx: Number
        },

        bytes: {
          tx: Number,
          rx: Number
        }
      }
    }
  },
  { collection: 'PROJET_COLLEC' }
);

const Projet = mongoose.model('projet', projetSchema);

module.exports = Projet;
