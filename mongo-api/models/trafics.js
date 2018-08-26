const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const traficSchema = new Schema(
  {
    paquetstx: Number,
    paquetsrx: Number,
    octetstx: Number,
    octetsrx: Number
  },
  { collection: 'TRAFIC_COLLEC' }
);

const Trafic = mongoose.model('trafic', traficSchema);

module.exports = Trafic;
