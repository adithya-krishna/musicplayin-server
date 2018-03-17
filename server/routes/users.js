import express from 'express';
const Router = require('express-promise-router')();
import passport from 'passport';
import passpostConfig from '../passport';

import { signup, signin, check } from '../controllers/users';
import { vaildateUser, schemas } from '../helpers/users';

const passportLocal = passport.authenticate('local', { session: false });
const passportJwt = passport.authenticate('jwt', { session: false });

Router
    .route('/signup')
    .post(vaildateUser(schemas.authSchema), signup);

Router
    .route('/signin')
    .post(vaildateUser(schemas.authSchema), passportLocal, signin);

Router
    .route('/check')
    .get(passportJwt, check);

export default Router;