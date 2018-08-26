const Plateforme = require('../models/plateformes');
const ReqError = require('../models/RequestErrors');

module.exports = {
  readAll(req, res) {
    Plateforme.find().then(plateformes => {
      res.send(plateformes);
    });
  },
  read(req, res) {
    const id = req.params.id;
    Plateforme.findById({ _id: id }).then(plateforme => {
      res.send({ plateforme });
    });
  },
  async create(req, res) {
    const messageType = req.body.messageType;
    const platform = req.body.platform;

    if (!messageType || messageType != 'hello') {
      return res.status(400).json({});
    }

    if (
      ( platform.manufacturer == 'Apple' && platform.system == 'iOS' ) ||
      ( platform.manufacturer != 'Apple' && platform.system == 'Android' )
    ) {
      try {
        const rlt = await Plateforme.create({
          messageType,
          platform
        });
        res.json({
          appId: rlt._id,
          samplePeriod: 30,
          reportBundleSize: 100
        });
      } catch (err) {
        res.status(400).send({ err });
      }
    } else {
      // save error..
      console.log('Saving error to err collection!')
      await ReqError.create({ content: 'plateforme request is not correct!' })

    }
    

    // const device = req.body.device;
    // const manufacturer = req.body.manufacturer;
    // const model = req.body.model;
    // const model = req.body.model;
    // const system = req.body.system;
    // const version = req.body.version;
    // const API = req.body.API;
    // const plateforme = new Plateforme({device,manufacturer,platform,model,manufacturer,typedevice,niveaubatterie});
    //     plateforme.save().then(() => {
    //         res.send({plateforme});
    //     });
  },

  delete(req, res) {
    const id = req.body.id;
    Plateforme.findByIdAndRemove({ _id: id }).then(plateforme => {
      res.send({ plateforme });
    });
  }
};
