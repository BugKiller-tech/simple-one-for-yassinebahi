const Trafic = require('../models/trafics');

module.exports = {
  readAll(req, res) {
    Trafic.find().then(trafics => {
      res.send(trafics);
    });
  },
  read(req, res) {
    const id = req.params.id;
    Trafic.findById({ _id: id }).then(trafic => {
      res.send({ trafic });
    });
  },
  create(req, res) {
    const paquetstx = req.body.paquetstx;
    const paquetsrx = req.body.paquetsrx;
    const octetstx = req.body.octetstx;
    const octetsrx = req.body.octetsrx;
    const trafic = new Trafic({ paquetstx, paquetsrx, octetstx, octetsrx });
    trafic.save().then(() => {
      res.send({ trafic });
    });
  },

  delete(req, res) {
    const id = req.body.id;
    Trafic.findByIdAndRemove({ _id: id }).then(trafic => {
      res.send({ trafic });
    });
  }
};
