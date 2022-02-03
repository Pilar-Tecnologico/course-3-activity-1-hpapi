//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const harryPotterApi = require('./data.json');//should require the data.json file
app.use(express.json());

app.get('/spells/:id', (req, res) => {
    //should respond with the spell with the corresponding id value from data.json 
    const { id } = req.params;
    const regex = /^[0-9]{1,2}$/
    if(regex.test(id)){
        const response = harryPotterApi.spells.find(spell => Number(id) === spell.id);
        if(!response){
            res.status(404);
        }
        res.json(response);

    } else{
        res.status(400).json({
            code: 'bad_request',
            menssage: 'Invalid request, check that the ID is valid',
            severity: 'LOW'
        });
    }
});


app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const { hogwartsStudent, hogwartsHouse } = req.query;
    
    if(hogwartsStudent && hogwartsHouse){
        const response = harryPotterApi.characters.filter(characters =>
        hogwartsHouse === characters.hogwartsHouse && 
        Boolean(hogwartsStudent) === characters.hogwartsStudent)
        res.json(response)
    } else{
        res.status(400).json({
            code: 'bad_request',
            menssage: 'Invalid request, check your query params',
            severity: 'LOW'
        });
    }
});

app.post('/spells', (req, res) => {
    //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});