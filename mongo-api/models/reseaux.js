const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reseauSchema = new Schema(
  {
    typereseau: String,
    dataconnection: String,
    roaming: String,
    simoperator: String,
    pays: String,
    reseauperator: String
  },
  { collection: 'RESEAU_COLLEC' }
);

const Reseau = mongoose.model('reseau', reseauSchema);

module.exports = Reseau;
