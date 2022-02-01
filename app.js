//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.as
const express = require('express');
const Joi = require('joi');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json'); //should require the data.json file
app.use(express.json());
const { spellSchema } = require('./validation')


app.get('/spells/:id', (req, res) => {
    //should respond with the spell with the corresponding id value from data.json    
    let id = req.params.id
    res.json(ApiData.spells[id - 1])

});

app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent

    const { hogwartsHouse, hogwartsStudent } = req.query;


    if (hogwartsHouse && hogwartsStudent) {
        
        const characts = ApiData.characters;
        const response = characts.filter((a) => hogwartsHouse === a.hogwartsHouse);
        res.json(response);
    } 
    
    else {
        res.status(400).send('Please enter a valid data...')
    }

});

app.post('/spells', (req, res) => {

    //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.

    const spellData = ApiData.spells;

    const { id, spell, use } = req.body


    const { error, value } = spellSchema.validate(req.body)

    if (!error) {

        const spellData2 = {

            id:  value.id,  //spellData.length + 1, --> Add this in case that you want to keep using an increasing length starting from 72
            spell: value.spell,
            use: value.use
        }

        spellData.push(spellData2);
        res.status(200).json({"operation": "add spell", "status": "accepted"
        })

    } else {
        res.status(400).json({"operation": "add spell", "status": "refused"})
       
    }




});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});