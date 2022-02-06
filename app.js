//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

app.get('/spells/:id', (req, res) => {
    const id = req.params.id;
    const spell = ApiData.spells.find((spell)=>{
        return id==spell.id;       
    })
    res.send(spell);         
});

app.get('/characters/:hogwartsHouse/:hogwartsStudent', (req, res) => {
    const hogwartsHouse = req.params.hogwartsHouse;
    const hogwartsStudent = req.params.hogwartsStudent =="true";

    const characters = ApiData.characters.filter((character)=>{
        return hogwartsHouse == character.hogwartsHouse && hogwartsStudent == character.hogwartsStudent;        
    })
    res.send(characters)
    
});

app.post('/spells', (req, res) => {
    //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
    if(!req.body.id || !req.body.spell || !req.body.use){
        res.status(400).send({
            operation : "add spell",
            status: "refused"
        });
    }
    res.status(200).send({
        operation: "add spell",
        status: "accepted"
    })
    
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});