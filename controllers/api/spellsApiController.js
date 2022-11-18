const ApiData = require('../../data.json');//should require the data.json file

  async function showSpell(req, res, next) { //should respond with the spell with the corresponding id value from data.json  
    const result = ApiData.spells.find(spell => spell.id == req.params.id)
    if (result){
      res.status(200).json(result)}
      else {
        res.send(404);
      }

  }     

module.exports = { showSpell };