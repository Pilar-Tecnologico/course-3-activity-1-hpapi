const ApiData = require('../../data.json');//should require the data.json file

  async function showSpell(req, res, next) { //should respond with the spell with the corresponding id value from data.json  
    const result = ApiData.spells.find(spell => spell.id == req.params.id)
    if (result){
      res.json(result)}
      else {
        res.json({
          mensaje: "No se encontraron hechizos. Intente con otra id."
      })
      }
  }     

  async function addSpell(req, res, next) { //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
    const { id , spell, use } = req.body;
    if (!id || !spell || !use){
        res.status(400).json({
          operation: "add spell", 
          status: "refused"
        })
    }
    else {
      res.status(200).json({
        operation: "add spell", 
        status: "accepted"
      })
    }
  }

module.exports = { showSpell, addSpell };