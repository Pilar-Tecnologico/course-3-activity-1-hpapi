//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const { json } = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());


app.get('/spells/:id', (req, res) => {
    //should respond with the spell with the corresponding id value from data.json    

    const { id } = req.params;

    // Gives the Spell info if it is in the dataset
    // const spellsIds = [];
    // spellsIds.push(...ApiData.spells.map(sp => sp.id));
    // if(spellsIds.includes(String(id)) === true){
    if(Number(id)-1 in Object.keys(ApiData.spells)){
        const response = ApiData.spells.find(element => element.id === parseInt(id));
        res.status(200).json(response);
    }
    // If the number is not found, then print Error
    else {
        res.status(400).send('Errorum Typium: The spelled spell is misspelled');
    }
});


app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent

    const {hogwartsStudent, hogwartsHouse} = req.query;
    var val = (hogwartsStudent === "true");
    
    if(hogwartsStudent && hogwartsHouse){
        const response = ApiData.characters.filter((characters) => (characters.hogwartsStudent === val && hogwartsHouse === characters.hogwartsHouse));
        if(response.length>0){
            res.status(200).json(response);
        }
        else{
            res.status(400).send('Thou are trying to find someone that is not around here. Try looking on marauders map.');
        }
    }
    else{
        res.status(400).send('This spell needs more ingredients.');
    }
});


// app.post('/spellsss', (req, res) => {  //ESTE NO FUNCIONÓ. NO ENTENDÍ POR QUÉ.
app.get('/spellsss', (req, res) => {
    //     //Should recive spell data from request body.
    //     //Should validate that the properities "id", "spell" and "use" are present in the body
    //     //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //     //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
    
        const {id, spell, use} = req.body;
    
        // res.json(id, spell, use)
        if(id && spell && use){
            res.status(200).json({"operation": "add spell", "status": "accepted"});
        }
        else{
            res.status(200).json({"operation": "add spell", "status": "refused"});
        }
});


app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});