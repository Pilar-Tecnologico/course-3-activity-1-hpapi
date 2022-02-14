//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

app.get('/', (req, res) => {
   console.log(ApiData)  
   res.json(ApiData)
});

app.get('/spells/:id', (req, res) => {
    //should respond with the spell with the corresponding id value from data.json  
    const {id}=req.params
    const data= ApiData.spells.find(element => element.id === parseInt(id))
    res.json(data)  
});

app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const { hogwartsStudent, hogwartsHouse } = req.query;
    if(hogwartsHouse && hogwartsStudent){
        const data = ApiData.characters.filter(hogwarts => (hogwarts.hogwartsStudent == (hogwartsStudent === 'true') && hogwarts.hogwartsHouse === hogwartsHouse));
        if(data.length>0){
            res.status(200).json(data);
        }
        else{
            res.status(400).json({
                code: 'bad_request',
                message:'Could not find your hogwartsStudent and hogwartsHouse values.'
        });
       }        
    }
    else{
        res.status(400).json({
            code: 'bad_request',
            message:'Check your hogwartsStudent and hogwartsHouse parameters.'
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