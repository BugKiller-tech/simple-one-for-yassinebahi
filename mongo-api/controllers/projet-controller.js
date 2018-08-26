const Projet = require('../models/projets');
const Plateforme = require('../models/plateformes');
const ReqError = require('../models/RequestErrors');

module.exports = {
  readAll(req, res) {
    Projet.find().then(projets => {
      res.send(projets);
    });
  },
  read(req, res) {
    const id = req.params.id;
    Projet.findById({ _id: id }).then(projet => {
      res.send({ projet });
    });
  },
  async create(req, res) {
    const rlt = [];
    //console.log('request', req.body);
    let insertedAtLeastOne = false;
    for (var i = 0; i < req.body.reports.length; i++) {
      var element = req.body.reports[i];
     const control = element.control;
     const plateform = element.plateform;
     const network = element.network;
     const traffic = element.traffic;
     
      try {
        console.log(control.appId);

        if (control && control.appId) {
          
          const existingPlat = await Plateforme.findOne({ _id: control.appId });
          if (existingPlat) {
            const projet = new Projet({ control, plateform, network, traffic });
            await projet.save();
            //console.log(req.body);
            insertedAtLeastOne = true;
            console.log('ok I found appId')
          } else {
            await ReqError.create({ content: 'wrong appId ->' + control.appId })            
          }
        } else {
          await ReqError.create({ content: 'missing appId' })
        }
      } catch (err) {
        console.log('catch block', err)
      }
    }
    if (insertedAtLeastOne) {
      res.send({
        ok: true,
        samplePeriod: 30,
        reportBundleSize: 100
      });
    }
    // try{
    //     console.log('~~~~~~ data from client side ~~~~~~~~');
    //     console.log(req.body);
    //     const rlt = await Projet.create(req.body);
    //     res.send({ reports: rlt });
    // } catch (err) {
    //     res.status(400).send({err})
    // }
  },

  delete(req, res) {
    const id = req.body.id;
    Projet.findByIdAndRemove({ _id: id }).then(projet => {
      res.send({ projet });
    });
  }
};
