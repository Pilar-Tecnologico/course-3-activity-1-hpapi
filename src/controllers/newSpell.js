const joi = require('joi') 
const validateNewSpell = require('../schemas/validateNewSpell');

async function createSpell(req, res) {
    const data = req.body;
    try {
        joi.assert(data, validateNewSpell.schemaSpell);
        res.json({"operation": "add spell", "status": "accepted"});
    } catch (err) {
        Object.assign({
            message: err.details[0].message
        })
        res.status(400).json({"operation": "add spell", "status": "refused"});
    } 
}

module.exports = {
    createSpell,
}
