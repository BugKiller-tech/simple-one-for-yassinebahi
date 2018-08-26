const Reseau = require('../models/reseaux');

module.exports = {
  readAll(req, res) {
    Reseau.find().then(reseaux => {
      res.send(reseaux);
    });
  },
  read(req, res) {
    const id = req.params.id;
    Reseau.findById({ _id: id }).then(reseau => {
      res.send({ reseau });
    });
  },
  create(req, res) {
    const typereseau = req.body.typereseau;
    const dataconnection = req.body.dataconnection;
    const roaming = req.body.roaming;
    const simoperator = req.body.simoperator;
    const pays = req.body.pays;
    const reseauperator = req.body.reseauperator;
    const reseau = new Reseau({
      typereseau,
      dataconnection,
      roaming,
      simoperator,
      pays,
      reseauperator
    });
    reseau.save().then(() => {
      res.send({ reseau });
    });
  },

  delete(req, res) {
    const id = req.body.id;
    Reseau.findByIdAndRemove({ _id: id }).then(reseau => {
      res.send({ reseau });
    });
  }
};
