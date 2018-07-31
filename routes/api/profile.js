const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('./../../models/Profile');
const User = require('./../../models/User');

const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: 'Profile works' }));

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.send(404).json(err));
  }
);

module.exports = router;
