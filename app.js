//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const { response } = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

/**
 * Get all data of a spell using his id as filter key.
 * @param {Object} req  Request.
 * @param {Object} res  Response.
 * @param {String} req.params.id  Spell's id.
 * @returns {object} response - Spell's data.
 */
app.get('/spells/:id', (req, res) => {
    //should respond with the spell with the corresponding id value from data.json  
    const { id } = req.params;
    const spell = ApiData.spells.find(spell => spell.id == id);
    if(spell)
    {
        res.status(200).json(spell);
    }
    else{
        res.status(400).json({
            code: 'bad_request',
            message:'Check your spell id.'
        });
    }
});

/**
 * Get characters data filtered by query params (hogwartsHouse and hogwartsStudent).
 * @param {Object} req  Request.
 * @param {Object} res  Response.
 * @param {String} req.query.hogwartsHouse  - Hogwarts house's name.
 * @param {String} req.query.hogwartsStudent - Hogwarts students status: true/false
 * @returns {object} response - Spell's data.
 */
app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const { hogwartsStudent, hogwartsHouse } = req.query;
    
    if(hogwartsHouse && hogwartsStudent){
        const response = ApiData.characters.filter(hogwarts => (hogwarts.hogwartsStudent == (hogwartsStudent === 'true') && hogwarts.hogwartsHouse === hogwartsHouse));
        console.log('respuesta:' + response);
        if(response.length>0){
            res.status(200).json(response);
        }
        else{
            res.status(400).json({
                code: 'bad_request',
                message:'Could not find your hogwartsStudent and hogwartsHouse values.'
        });
       }        
    }
    else{
        res.status(400).json({
            code: 'bad_request',
            message:'Check your hogwartsStudent and hogwartsHouse parameters.'
        });
    }
    
});

/**
 * Create new spell.
 * @param {Object} req  - Request.
 * @param {Object} res  - Response.
 * @param {number} req.body.id - Spell's id.
 * @param {string} req.body.spell - Spell's name.
 * @param {string} req.body.use - Spell's use.
 * @returns {object} response - Operation result.
 */
app.post('/spells', (req, res) => {
    //Should receive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const { id, spell, use } = req.body;
    console.log('valor id: ' + id + 'valor spell: ' + spell + 'valor use: ' + use);
    
    if(Number (id) && spell && use ){

        res.status(200).json({
            operation: 'add spell',
            status: 'accepted'
        });
        }
    else{
        res.status(400).json({
            operation: 'add spell',
            status: 'refused'
        });
    }        
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});