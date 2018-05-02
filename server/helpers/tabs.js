import Joi from 'joi';
import isEmpty from 'lodash/isEmpty';

export const vaildateTab = schema => (req, res, next) => {
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
    tabSchema: Joi.object().keys({
        tabInfo: Joi.object().keys({
            songName: Joi.string().required(),
            artist: Joi.string(),
            timeSignature: Joi.string(),
            key: Joi.string(),
            capo: Joi.string(),
            difficulty: Joi.string(),
            year: Joi.string() || Joi.date(),
            genre: Joi.string()
        }),
        text: Joi.strict().required(),
        lyric: Joi.array() || Joi.string(),
        chords: Joi.array(),
        rank: Joi.number(),
        isDeleted: Joi.boolean()
    }),
    tabUpdateSchema: Joi.object().keys({
        tabInfo: Joi.object().keys({
            songName: Joi.string(),
            artist: Joi.string(),
            timeSignature: Joi.string(),
            key: Joi.string(),
            capo: Joi.string(),
            difficulty: Joi.string(),
            year: Joi.string() || Joi.date(),
            genre: Joi.string()
        }),
        text: Joi.strict(),
        lyric: Joi.array() || Joi.string(),
        chords: Joi.array(),
        rank: Joi.number(),
        isDeleted: Joi.boolean()
    })
}