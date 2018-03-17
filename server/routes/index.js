import express from 'express';
const Router = require('express-promise-router')();
import passport from 'passport';
import passpostConfig from '../passport';

export const passportLocal = passport.authenticate('local', { session: false });
export const passportJwt = passport.authenticate('jwt', { session: false });

export default Router;