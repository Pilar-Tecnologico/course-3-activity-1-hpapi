const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const data = require('./data.json');
app.use(express.json());

app.get('/spells/:id', (req, res) => {
    const { id } = req.params;
    const response = data.spells.find((spell) => Number(id) === spell.id);
    res.json(response);
});

app.get('/characters', (req, res) => {
    const { house, student } = req.query;
    const studentStatus = student == "true"
    const response = data.characters.filter((charact) => house === charact.hogwartsHouse && studentStatus === charact.hogwartsStudent);
    res.json(response);
});

app.post('/spells', (req, res) => {
    const spell = req.body;
    if(spell.id && spell.spell && spell.use){
        res.status(200).json({
            "operation": "add spell",
            "status": "accepted"
        });
    } else {
        res.status(400).json({
            "operation": "add spell",
            "status": "refused"
        });
    }
});

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});