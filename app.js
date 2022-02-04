//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

/*app.get('/', (req, res) => {
    res.json(ApiData);
})*/

app.get('/spells/:id', (req, res) => {
    //should respond with the spell with the corresponding id value from data.json 
    const { id } = req.params;
    const response = ApiData.spells.find((spell) => { return Number (id) === spell.id });
    if (response) {
        res.json(response);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
})

app.get('/characters', (req, res) => {
    //Should use query params to filter the hogwartsHouse and hogwartsStudent
    const { hogwartsHouse, hogwartsStudent } = req.query;
    Object.defineProperty(String.prototype, 'capitalizeFirstLetter', {
        value: function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        },
        writable: true,
        configurable: true
    });
    if (hogwartsHouse && hogwartsStudent) {
        const response = ApiData.characters.filter((character) => { return hogwartsHouse.capitalizeFirstLetter() === character.hogwartsHouse && Boolean(hogwartsStudent) === character.hogwartsStudent });
        res.json(response);
    } else {
        res.status(400).json({ error: 'Bad request' });
    }
})

app.post('/spells', (req, res) => {
    //Should recive spell data from request body.
    //Should validate that the properities "id", "spell" and "use" are present in the body
    //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
    //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
    const data = req.body;
    if (data.id && data.spell && data.use) {
        ApiData.spells.push(data);
        res.status(200).json({ operation: 'add spell', status: 'accepted' });
    } else {
        res.status(400).json({ operation: 'add spell', status: 'refused' });
    }
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});