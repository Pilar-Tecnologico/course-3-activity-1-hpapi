const {query} = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');
app.use(express.json());

app.get('/spells/:id', (req, res) => {
const {id} = req.params;
const spell = ApiData.spells.find((spells) =>spells.id == id);
res.json(spell);
});

app.get('/characters', (req, res) => {
    const {hogwartsStudent, hogwartsHouse} = req.query;
    const character = Apidata.characters.filter((character) => {
        if(hogwartsStudent){
            return character.hogwartsStudent == JSON.parse(hogwartsStudent);
        } if(hogwartsHouse){
            return character.hogwartsHouse == hogwartsHouse;
        }
    })
    res.json(character);
});

app.post('/spells', (req, res) => {
    const data = req.body;
    if(!data.id || !data.spell || !data.use){
        res.status(400).json({operation: "add spell", status: "refused"})
    }
    Apidata.spells.push(data)
    res.status(200).json({operation: "add spell", status: "accepted"})
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});