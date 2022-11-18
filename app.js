//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

app.get('/spells', (req, res) => {
    
    res.json(ApiData.spells);
});

app.get('/spells/:id', (req, res) => {
    //should respond with the spell with the corresponding id value from data.json
    const {id} = req.params;
    const found = ApiData.spells.find(element => element.id == id)
    res.json(found.spell)    
});

app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent

    const {hogwartsStudent, hogwartsHouse} = req.query;

    if(!hogwartsStudent && !hogwartsHouse){
        res.json(ApiData.characters);
    }

    const result = ApiData.characters.filter((element) => {
        return element.hogwartsStudent == hogwartsStudent ||
                element.hogwartsHouse == hogwartsHouse
    })

    res.json(result)
   
});

app.post('/spells', (req, res) => {
    
    //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.

    const data = req.body;

    if(!data.id || !data.spell || !data.use){
        res.status(400).json(
            {
            "operation": "add spell", 
            "status": "refused"
            }
       );
       throw new Error();
    }
    
    ApiData.spells.push(data);
    res.status(200).json(
        {
        "operation": "add spell", 
        "status": "accepted"
        }
    );
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});