const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport')
const path = require('path')
const config = require('./config/config');
const catelogy = require('./route/catelogy');
const users = require('./route/users');
const usersActive = require('./route/activeUsers');
const account = require('./route/account')
const brends = require('./route/brends')
const goods = require('./route/goods')

app.use(express.static(path.join(__dirname, 'app')));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json());
app.use('/api/category', catelogy);
app.use('/api/brends', brends);
app.use('/api/goods', goods);
app.use('/api/users', users);
app.use('/activate', usersActive);
app.use('/', account)
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport);

mongoose.connect('mongodb://adminlitehnocomua:QHuEXDxFoP62@localhost:27017/litehnocomua', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then( () => {
    console.log('database connected')
    app.listen(process.env.PORT || PORTNODE, () => console.log(`Server start on port ${PORTNODE}`));
})
.catch((error) => console.log(error));



module.exports = app;