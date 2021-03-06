const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const db = require('./config/keys').mongoURI;

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(e => console.log(e));

app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

if ((process.env.NODE_ENV = 'production')) {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
