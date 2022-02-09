//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

app.get('/spells/:id', (req, res) => {
    //should respond with the spell with the corresponding id value from data.json 
    const {id} = req.params;   
    //res.send(ApiData.spells[id]);
    res.send(ApiData.spells.filter(e=>e.id==id))
});

app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const {student,house} = req.query;
    let isStudent = false;
    // if(student=="true"){
    //     isStudent=true;
    // }
    // res.send(req.params);
    // res.send(ApiData.characters.filter(e=>e.hogwartsStudent==isStudent&&e.hogwartsHouse==house));

    if(student&&house){
        if(student=="false"){
            isStudent=false;
        }else if(student=="true"){
            isStudent=true;
        }
        const response = ApiData.characters.filter(char=>house===char.hogwartsHouse&&isStudent==char.hogwartsStudent);
        res.json(response);
    }else{
        res.status(400).json({
            code: 'bad_request',
            messaage: 'Invalid request, check your query params',
            severity: 'LOW'
        });
    }
});

app.post('/spells', (req, res) => {
    //Should recieve spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});