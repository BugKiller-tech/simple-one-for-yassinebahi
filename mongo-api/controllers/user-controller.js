const User = require('../models/users');

module.exports = {
  readAll(req, res) {
    User.find().then(users => {
      res.send(users);
    });
  },
  read(req, res) {
    const id = req.params.id;
    User.findById(id).then(user => {
      res.send({ user });
    });
  },
  create(req, res) {
    const body = req.body;
    const user = new User({ name: body.name });
    user.save().then(() => {
      res.send(user);
    });
  },

  delete(req, res) {
    const id = req.body.id;
    User.findByIdAndRemove(id).then(user => {
      res.send({ user });
    });
  },

  oldest(req, res) {
    User.find()
      .sort({ age: -1 })
      .limit(2)
      .then(user => {
        res.send({ user });
      });
  },

  youngest(req, res) {
    User.find()
      .sort({ age: 1 })
      .limit(2)
      .then(user => {
        res.send({ user });
      });
  },

  hasLongestMovie(req, res) {
    User.aggregate([
      { $unwind: '$movies' },
      {
        $lookup: {
          from: 'MOVIE_COLLEC',
          localField: 'movies',
          foreignField: '_id',
          as: 'movieContent'
        }
      },
      { $unwind: '$movieContent' },
      { $sort: { 'movieContent.duration': -1 } },
      {
        $project: {
          'User name': '$name',
          'Movie title': '$movieContent.title',
          'Duration of movie': '$movieContent.duration'
        }
      },
      { $limit: 1 }
    ]).then(result => {
      res.send(result);
    });
  },



  login: async (req, res) => {
    if (!req.body.name) { return res.status(400).json({ errors: 'Please provide the name' }) }
    if (!req.body.password) { return res.status(400).json({ errors: 'Please provide the password' }) }

    try {
      const user = await User.findOne({ name: req.body.name, password: req.body.password }).lean();
      let user1 = Object.assign({}, user);
      delete user1.password;
      if (user) {
        req.session.user = user
        return res.json({ message: 'Successfully logged in', user: user1 })
      } else {
        return res.status(400).json({ errors: 'Invalid credential' })
      }
    } catch (err) {
      return res.status(400).json({ errors: 'Something went wrong!' })      
    }
  },
  checkLogin: async(req, res) => {
    if (req.session.user) {
      return res.json({message: 'logged in status', username: req.session.user.name})
    }
    return res.status(400).json({message: 'not logged in status'})
  }
};
