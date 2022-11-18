//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json');//should require the data.json file
app.use(express.json());

app.get('/spells/:id', (req, res) => {
 //should respond with the spell with the corresponding id value from data.json 
    
    //Destructuring req.params
    const { id } = req.params;
    
    //Search Spells by ID
	const result = ApiData.spells.find((spell) => spell.id === +id);
    if (!result) return res.status(404).send('The selected ID does not correspond to a spells');
	res.json(result);   
});

app.get('/characters', (req, res) => {
//Destructuring req.query
const {hogwartsStudent,hogwartsHouse}= req.query;

//Convert String to a "False Bool"
const boolOutput = (hogwartsStudent.toLowerCase() === "true" ); // returns true
if(!boolOutput)return res.status(400).send({ msj: 'The value introduce in hogwarts House is incorrect.' });

//Filter characters by query in hogwarts House and hogwarts Student
const results = ApiData.characters.filter(
    (character) => {return character.hogwartsHouse === hogwartsHouse &&character.hogwartsStudent === boolOutput});
res.json(results)

});

app.post('/spells', (req, res) => {
//Should recive spell data from request body.
const { id, spell, use } = req.body;

//Should validate that the properities "id", "spell" and "use" are present in the body
if (!id || !spell || !use)return res.status(400).send({
    msj: "The spell must have an ID, spell and use. Fill in all the necessary fields!",
});

//Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
const repet =ApiData.spells.find((spell)=>spell.id === +id);
if(repet) return res.status(400).send({ msj: '"operation": "add spell", "status": "refused"' });

//Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
else{
const newSpell = {
    id: +id,
    spell: spell,
    use: use};
ApiData.spells.push(newSpell);
res.status(200).send({"operation": "add spell", "status": "accepted"})
}

res.json(ApiData.spells);
});


app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});