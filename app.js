//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

function validar(data){
    if(typeof data.id === 'number' && typeof data.spell == 'string' && typeof data.use == 'string'
    ){
        return true;
    } else {
        return false;
    }
}


app.get('/spells/:id', (req, res) => {
    //should respond with the spell with the corresponding id value from data.json    
    const { id } = req.params;
    const spell = ApiData.spells.find((e) => e.id == id);
    res.json(spell);
});



app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const filter = req.query;
    const results = ApiData.characters.filter((characters) => 
        characters.hogwartsHouse == filter.hogwartsHouse &&
         characters.hogwartsStudent ==  JSON.parse(filter.hogwartsStudent)
    )
    res.json(results);
});

app.post('/spells', (req, res) => {

   
    //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
    const spell = req.body;
    const value = validar(spell);
    if(!value){
        res.status(400).send('{"operation": "add spell", "status": "refused"}');
    } else {
        res.status(200).send('{"operation": "add spell", "status": "accepted"}');
    }
 
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});