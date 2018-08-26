UserController = require('../controllers/user-controller');
ProjetController = require('../controllers/projet-controller');
PlateformeController = require('../controllers/plateforme-controller');
ReseauController = require('../controllers/reseau-controller');
TraficController = require('../controllers/trafic-controller');
const zlib = require('zlib');

const decompressData = (req, res, next) => {
  zlib.inflate(Buffer.from(req.body, 'base64'), (err, result) => {
    if (err) {
      res.status(500).send('An error occurred while decompressing deflate.');
    } else {
      req.body = JSON.parse(result.toString());
      next();
    }
  });
};

module.exports = server => {
  // Envoi les parametres req et res de facon cachée a votre fonction.

  server.get('/', (req, res) => {
    res.send('hello Nokia');
  });

  //USER
  server.get('/users', UserController.readAll);
  server.get('/user/:id', UserController.read);
  server.post('/user', UserController.create);
  server.delete('/user', UserController.delete);

  //Projet
  server.get('/projets', ProjetController.readAll);
  server.get('/projet/:id', ProjetController.read);
  // server.post('/projet', decompressData, ProjetController.create);
  server.post('/projet', ProjetController.create);
  server.delete('/projet', ProjetController.delete);

  //Plateforme
  server.get('/plateformes', PlateformeController.readAll);
  server.get('/plateforme/:id', PlateformeController.read);
  server.post('/plateforme', PlateformeController.create);
  server.delete('/plateforme', PlateformeController.delete);

  //Reseau
  server.get('/reseaux', ReseauController.readAll);
  server.get('/reseau/:id', ReseauController.read);
  server.post('/reseau', ReseauController.create);
  server.delete('/reseau', ReseauController.delete);

  //Trafic
  server.get('/trafics', TraficController.readAll);
  server.get('/trafic/:id', TraficController.read);
  server.post('/trafic', TraficController.create);
  server.delete('/trafic', TraficController.delete);
};
