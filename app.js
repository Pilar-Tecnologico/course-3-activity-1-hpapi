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
    const spell = ApiData.spells.find((spells) => spells.id == id)
    res.json(spell)
});

app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const {hogwartsHouse,hogwartsStudent} = req.query;
    if(!hogwartsHouse && !hogwartsStudent){
        res.json(ApiData.characters);
    }
    const result = ApiData.characters.filter((result) => {
        return result.hogwartsHouse == hogwartsHouse ||
            result.hogwartsStudent == JSON.parse(hogwartsStudent);

    })
    res.json(result)

});

app.post('/spells', (req, res) => {
    //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
    const data = req.body;
    ApiData.spells.push(data);
    
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});