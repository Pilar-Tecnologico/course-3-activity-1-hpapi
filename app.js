//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const { json } = require('express/lib/response');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

app.get('/spells/:id', (req, res) => {
    const regex = /^[0-9]{1,2}$/
    const id = Number(req.params.id)
    if (regex.test(id)){
        const spell = ApiData.spells.find(spell => spell.id === id)
        res.status(200).json({
            spell: spell
        })
    }else{
        res.status(400).json({
            message: `Id:${id} Not Found`
        })
    }
    //should respond with the spell with the corresponding id value from data.json    
});

app.get('/characters', (req, res) => {

    const {house, estudent} = req.query;

    if(house && estudent) {
        const resolve = ApiData.characters.filter(character => String(character.hogwartsStudent) === estudent && character.hogwartsHouse ===  house)
        console.log(resolve)
       
       if(resolve.length > 0){
        res.status(200).json({
            characters: resolve
        })
       }else{
        res.status(400).json({
            message: `The house and the student from hogwarts are not available`
        })
       }
    }else{
        res.status(400).json({
            message: "Please fill in the fields"
        })
    }

    //Should use query params to filter the hogwartsHouse and hogwartsStudent
});

app.post('/spells', (req, res) => {

    const {id, spell, use} = req.body;

    console.log(String(spell))
    if(id && spell && use){
        res.status(200).json({
            operation: "add spell",
            status: "accepted"
        })
    }else{
        res.status(400).json({
            operation: "add spell",
            status: "refused"
        })
    }

    //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});