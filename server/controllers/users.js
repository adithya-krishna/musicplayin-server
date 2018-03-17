import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import JWT from 'jsonwebtoken';
import moment from 'moment';

import CONFIG from '../config.json';
import { User } from '../models/users';

export const wrapResponse = (responseBody, wrapper) => ({ ...wrapper, data: { ...responseBody } });

export const signUserAndGetToken = ({ id }) => {
    return JWT.sign({
        iss: CONFIG.JWT_ISS,
        sub: id,
        iat: moment().valueOf(),
        exp: moment().add(1, 'day').valueOf()
    }, CONFIG.JWT_SECRET)
}

export const signup = async (req, res, next) => {
    const { username, password } = req.valid.body;
    const foundUser = await User.findOne({ username });

    if (!isEmpty(foundUser)) {
        return res
            .status(409)
            .json({ msg: `User with username ${username} already exists` })
    }

    const newUser = new User({ username, password });
    await newUser.save();
    const createdUser = pick(newUser, ['id', 'username', 'createdAt', 'updatedAt']);
    const response = { msg: `User created`, token: signUserAndGetToken(createdUser) };
    return res
        .json(wrapResponse(createdUser, response));
}

export const signin = async (req, res, next) => {
    const token = signUserAndGetToken(req.user);
    res.json({ token })
}

export const check = async (req, res, next) => {
    res.json({
        result: 'Viewing secret'
    })
}

export default {
    signup,
    signin,
    check
}