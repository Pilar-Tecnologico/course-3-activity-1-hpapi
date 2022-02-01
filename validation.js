const Joi = require('joi');

const spellSchema = Joi.object({

    id: Joi.number()
        .integer()
        .required(),

    spell: Joi.string()
        .min(3)
        .max(30)
        .required(),

    use: Joi.string()
        .min(3)
        .max(30)
        .required()

});

module.exports = {

    spellSchema

}