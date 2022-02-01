//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require("./data.json");//should require the data.json file
const newSpell = require('./src/controllers/newSpell')
app.use(express.json());


/* ------// All Spells Test endpoint------ */
app.get("/", (req, res) => {res.json(ApiData);});


/* ------// spell with the corresponding id ------ */
app.get('/spells/:id', (req, res) => {
    //should respond with the spell with the corresponding id value from data.json
    const { id } = req.params;

    //regex basic validated Id, checks if user has entered either a 1 digit or 2 digit, for handle status 404 and 400.  
    const regex = /^[0-9]{1,2}$/
    
    if (regex.test(id)) {
        const response = ApiData.spells.find((spell) => Number(id) === spell.id);
        if (!response) {
            res.status(404).json({ id: "Not Found"});//no found, status 404. 
        }
        res.json(response); //found, status 200 is default.
    } else {
        res.status(400).json({//Bad request, status 400.
            code: "Bad request",
            message: "Invalid request, check that the Id is valid",
            severity: "LOW",
        });
    }

});

/* ------// query params to filter ------ */
app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const data = { hogwartsHouse, hogwartsStudent } = req.query;
    //console.log(data)
    if(hogwartsHouse && hogwartsStudent){
        const response = ApiData.characters.filter((characters) => hogwartsHouse === characters.hogwartsHouse && hogwartsStudent === String(characters.hogwartsStudent));
        //console.log(response)
        if(!response.length > 0) {
            res.status(404).json({ characters: "Not Found"})
        }
        res.json(response)
    } else {
        res.status(400).json({
            code: 'Bad request',
            message: 'Invalid request, check your query params',
            severity: 'LOW'
        })
    }
});


/* ---app.post("/spell")---// Using the "JOI" library to validate ------ */
// Create the folders -> src --> controllers and schemas
// js files: newSpell.js and validateNewSpell.js
app.post("/spell", newSpell.createSpell);


/* ---app.post("/spells")----// without using the "JOI" library to validate ------ */
app.post('/spells', (req, res) => {
    //Should recive spell data from request body.
    const data = { id, spell, use } = req.body;
    //console.log(data)
    //Should validate that the properities "id", "spell" and "use" are present in the body
    if (id && spell && use) {
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    res.json({ operation: "add spell", status: "accepted" }); //status 200 is default.
        
    } else {
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
    res.status(400).json({ operation: "add spell", status: "refused" });
    }

});
app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});