import express from 'express';
import * as Polyfill from 'babel-polyfill';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import users from './routes/users';
import Mongoose from 'mongoose';

Mongoose.connect('mongodb://localhost/musicplayin')

const App = express();

// middleware
App.use(morgan('dev'));
// parse application/x-www-form-urlencoded
App.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
App.use(bodyParser.json())

// routes
App.use('/api', users);

export default App;