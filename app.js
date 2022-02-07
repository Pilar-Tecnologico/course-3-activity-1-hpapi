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
    const response = ApiData.spells.find((data) => { return Number(id) === data.id });
    res.json(response);
});

app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const { hogwartsStudent, hogwartsHouse } = req.query;
    const a = (v) => { return v === "false" || v === "null" || v === "NaN" || v === "undefined" || v === "0" ? false : !!v; }
    if (hogwartsHouse && hogwartsStudent) {
        const response = ApiData.characters.filter((data) => { return (hogwartsHouse === data.hogwartsHouse && a(hogwartsStudent) === data.hogwartsStudent) });
        res.json({ response });
    } else {
        res.status(400).json({
            code: 'bad_request',
            message: 'Invalid request, check your query params',
            severity: 'LOW'
        })
    }
});

app.post('/spells', (req, res) => {
    const { id, spell, use } = req.body;

    if (id && spell && use) {
        res.status(200).json({
            operation: 'add spell',
            status: 'accepted'
        });
    } else {
        res.status(400).json({
            operation: 'add spell',
            status: 'refused'
        });
    }
    //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});