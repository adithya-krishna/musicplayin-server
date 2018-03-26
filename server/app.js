import express from 'express';
import * as Polyfill from 'babel-polyfill';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors'

import users from './routes/users';
import tabs from './routes/tabs';
import Mongoose from 'mongoose';

Mongoose.connect('mongodb://localhost/musicplayin')

const App = express();

App.use(cors());

// middleware
App.use(morgan('dev'));
// parse application/x-www-form-urlencoded
App.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
App.use(bodyParser.json())

// routes
App.use('/api', users);
App.use('/api', tabs);

export default App;