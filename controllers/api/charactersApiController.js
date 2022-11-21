const ApiData = require('../../data.json');//should require the data.json file

  async function filterCharacter(req, res, next) { //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const { hogwartsHouse , hogwartsStudent } = req.query;
    if (!hogwartsHouse || !hogwartsStudent){
        res.json({
            mensaje: "Faltan criterios de búsqueda. Parámetros esperados: hogwartsHouse y hogwartsStudent."
        })
        return;
    }
    const student = (hogwartsStudent == 'true') ? true : false;
    const result = ApiData.characters.filter(character => {
        return hogwartsHouse == character.hogwartsHouse &&
                student == character.hogwartsStudent;
    })
    if (result.length == 0){
        res.json({
            mensaje: "No se encontraron personajes. Por favor, modifique los criterios de búsqueda."
        })
    }
    else{
    res.json(result)}
    }

module.exports = { filterCharacter };