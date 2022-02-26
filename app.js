//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

app.get('/spells/:id', (req, res) => { 
    //should respond with the spell with the corresponding id value from data.json    
    const { id } = req.params;
    const spell = ApiData["spells"].find((spell) => spell.id === parseInt(id));
    res.status(200).json(spell);
});

app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const { hogwartsHouse, hogwartsStudent } = req.query;
    const characters = ApiData["characters"].filter(function(character){
        if(hogwartsHouse && hogwartsStudent){
            return character.hogwartsHouse === hogwartsHouse && character.hogwartsStudent.toString() === hogwartsStudent;
        } else if (hogwartsHouse){
            return character.hogwartsHouse === hogwartsHouse;
        } else if (hogwartsStudent){
            return character.hogwartsStudent.toString() === hogwartsStudent;
        } else {
            return true;
        }
    })
    res.status(200).json(characters);
});

app.post('/spells', (req, res) => {
    //Should recive spell data from request body.
    const { id, spell, use } = req.body;

    //Should validate that the properities "id", "spell" and "use" are present in the body
    if(id && spell && use){
        //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
        return res.status(200).json({operation: "add spell", status: "accepted"});
    }

    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
    return res.status(400).json({operation: "add spell", status: "refused"});
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`);
});