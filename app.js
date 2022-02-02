const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

/**
 * Get all data of a spell, given his id
 * @param {Object} req  The request.
 * @param {Object} res  The response.
 * @param {String} req.params.id  The spell id.
 * @returns {object} response - spell data.
 */
app.get('/spells/:id', (req, res) => {

    const id = Number(req.params.id);

    if(Number.isInteger(id)) {
        const response = ApiData.spells.find( (spell) => id === spell.id )
        res.json(response)
    }else{
        res.status(400).json({
            code: 'bad_request',
            message: 'Invalid request, check your params (id must be a number)',
        });
    }
});

/**
 * Get characters data filtered by query params. If there are no query params in the request, get all the characters.
 * @param {Object} req  The request.
 * @param {Object} res  The response.
 * @param {String} req.query.hogwartsHouse  - Name of the hogwarts house
 * @param {String} req.query.hogwartsStudent - filter for hogwarts students, example: true/false
 * @returns {object} response - spell data
 */
app.get('/characters', (req, res) => {

    const { hogwartsHouse, hogwartsStudent } = req.query;
    
    if(hogwartsStudent || hogwartsHouse){
        
        const response = (hogwartsStudent && hogwartsHouse) ? 
                            ApiData.characters.filter( char => (char.hogwartsStudent === (hogwartsStudent === 'true') && char.hogwartsHouse === hogwartsHouse ) ) 
                                : (hogwartsStudent) ? 
                                    ApiData.characters.filter( char => ( char.hogwartsStudent === (hogwartsStudent === 'true') ) )
                                        : ApiData.characters.filter( char => ( char.hogwartsHouse === hogwartsHouse ) )
        res.json(response);
    } else {
        res.json(ApiData.characters);
    }
});

/**
 * Add new Spell
 * @param {Object} req  - The request.
 * @param {Object} res  - The response.
 * @param {number} req.body.id - ID of the spell
 * @param {string} req.body.spell - spell name
 * @param {string} req.body.use - use of the spell
 * @returns {object} response - operation result 
 */
app.post('/spells', (req, res) => {

    const { id, spell, use } = req.body;

    if( Number(id) && spell && use){
        res.json({
            operation: 'add spell', 
            status: 'accepted'
        })
    } else {
        res.status(400).json({
            operation: 'add spell', 
            status: 'refused'
        });
    }
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});