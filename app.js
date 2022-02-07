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
    const { id } = req.params;
    const spell = ApiData.spells.find((e) => id === e.id);
    if (spell) {
      res.status(200).json(spell);
    }else {
      res.status(404).json({ 
        code: 'bad_request',
        message:'Check number id.',
        severity: "Immobulus",
      });
    }
});

app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const {hogwartsHouse, hogwartsStudent} = req.query;
    if (hogwartsHouse && hogwartsStudent){
        const response = ApiData.characters.filter((c) => {return hogwartsHouse === c.hogwartsHouse && c.hogwartsStudent === (hogwartsStudent === 'true')});
        res.json(response); 
    } else {
        res.status(400).json({
            code: 'bad request',
            message: 'invalid, check parameters',
            severity: 'Immobulus'
        });
    }
});

app.post('/spells', (req, res) => {
    //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
    

    const {id, spell, use} = req.body;
  
    if (id && spell && use) {
        res.json({ 
            operation: "add spell",
            status: "accepted" }); 
    } else {
        res.status(400).json({ 
            operation: "add spell", 
            status: "refused" });
        }
    
      
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});