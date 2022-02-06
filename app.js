//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

app.get('/', (req, res) => {
    res.json(ApiData);
});

app.get('/spells/:id', (req, res) => {
    //should respond with the spell with the corresponding id value from data.json 
    const {id} = req.params;
    
    if (id) {
        const response = ApiData.spells.find((spell) => Number(id) === spell.id)
        if (!response) {
            res.status(404);
        }
        res.json(response);
    }else {
        res.status(400).json({
            code: 'BAD REQUEST',
            message: ' Invalido, por favor revise sus parametros.',
            severity: 'BAJA'
        });
    }
});

app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const {hogwartsHouse, hogwartsStudent} = req.query;

    if (hogwartsHouse && hogwartsStudent){
        const filtered = ApiData.characters.filter((character) => {return hogwartsHouse === character.hogwartsHouse && Boolean(hogwartsStudent) === character.hogwartsStudent});
        res.json(filtered);
    } else {
        res.status(400).json({
            code: 'bad request',
            message: 'Invalido, por favor revisa tus parametros',
            severity: 'BAJA'
        });
    }
});

app.post('/spells/create', (req, res) => {
    //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
    const {id, spell, use} = req.body;
    if (id && spell && use){
        res.status(200).json({
            code:'SUCCESS',
            operation: 'add spell',
            status:'accepted'    
        });
    }else {
        res.status(400).json({
            code:'BAD REQUEST',
            operation: 'add spell',
            status:'refused' 
        });
    }
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});