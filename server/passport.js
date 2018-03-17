import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import isEmpty from 'lodash/isEmpty';

import CONFIG from './config.json';
import { User } from './models/users';

// Local Strategy
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const currentUser = await User.findOne({ username });

        // If no user is found
        if (isEmpty(currentUser)) {
            return done(null, false);
        }

        const isValid = await currentUser.verifyPassword(password);
        if (!isValid) {
            return done(null, false);
        }

        done(null, currentUser);
    } catch (error) {
        done(error, false);
    }
}))

// JWT strategies
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.JWT_SECRET
}
passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);

        // If no user is found
        if (isEmpty(user)) {
            return done({
                msg: 'User unavailable'
            }, false);
        }

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}))