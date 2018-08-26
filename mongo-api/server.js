const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const server = express();
const mongoose = require('mongoose');

const User = require('./models/users');

mongoose.Promise = global.Promise;

server.use(bodyParser.text());
server.use(bodyParser.json());
// server.set('json spaces', 2);
routes(server);

let code = 'ed923f6bc33010c5777f0aa1d983ddd20ed94aa160686949d3a974509c7310b17542529a9ae0ef5ec97f52b9866688978216d97aeff48e937ec788105a81d66c0bab5a025d10aa40a2329ac6ce1b360bf26eb7841cdbd51a390aa3b0b4c6209daab38d55d39beb34897f2c2665abd384f66233b85496cc14a8aa71d8dd4be6726ebd9035330654fd089fe03aa74932c912600ea876e328ae97c82a2eb6562e58a9c1cbec0f0cd3bf3dad5ea967e7b8b783d69946e73e2c7d4ff3ea59826206556b2a00dfde30c3ee5108c80d47e12a0ebce074da7b123299ca2856143c1f4fa5f7e31b7337c9f21db4cfe5cb2ee0cbddd7553c5655a77a62e357d0756de092b0e8f75ff7ed9b9c589af3fde7e4726e96ce037186a8bf600c2cb527034b434560a953034b81a5c05260e91fb364d78fa8f906'

var hexdata = new Buffer(code, 'ascii').toString('hex');

console.log('hexa code------------>',hexdata);

server.listen(5000, () => {
  console.log('Serveur demarré en écoute sur le porte 3000 !');
  mongoose.connect('mongodb://localhost/smartphone');
  mongoose.connection
    .once('open', async () => {
      console.log('Connexion à MongoDB établie !')
      try {
        const users = await User.find({});
        if (users.count == 0) {
          // await User.create({ name: 'test',  })
        }
      } catch (err) {

      }

    })
    .on('error', error => {
      console.warn('Warning', error);
    });
});
