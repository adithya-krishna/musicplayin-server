import Joi from 'joi';
import isEmpty from 'lodash/isEmpty';

export const vaildateUser = schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        return res.status(400).json(result.error)
    }

    if (isEmpty(req.valid)) {
        req.valid = {
            body: result.value
        };
    }
    next();
}

export const schemas = {
    authSchema: Joi.object().keys({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(4).required(),
    })
}