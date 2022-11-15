//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json'); //should require the data.json file
app.use(express.json());

app.get('/spells/:id', (req, res) => {
	//should respond with the spell with the corresponding id value from data.json
	const { id } = req.params;
	const result = ApiData.spells.find((spell) => spell.id === parseInt(id));
	if (!id) return res.status(404).send('The spell with the given ID was not found.');
	if (!result) return res.status(200).send({ msj: 'The spell with the given ID was not found.' });

	res.json(result);
});

app.get('/characters', (req, res) => {
	//Should use query params to filter the hogwartsHouse and hogwartsStudent
	const { hogwartsHouse, hogwartsStudent } = req.query;
	if (!hogwartsHouse || !hogwartsStudent)
		return res
			.status(400)
			.send({ msj: 'The search parameters hogwartsStudent and hogwartsHouse, must be sent.' });
	const boolHogwartStudent = hogwartsStudent.toLocaleLowerCase() === 'true';
	const results = ApiData.characters.filter(
		(character) =>
			character.hogwartsHouse === hogwartsHouse && character.hogwartsStudent === boolHogwartStudent
	);

	if (results.length <= 0) {
		res.status(200).send({ msj: 'No results found for the search.' });
	} else {
		res.json(results);
	}
});

app.post('/spells', (req, res) => {
	//Should recive spell data from request body.
	const { id, spell, use } = req.body;
	//Should validate that the properities "id", "spell" and "use" are present in the body
	if (!id || !spell || !use)
		return res.status(400).send({
			msj: 'The spell must have an id, spell and use.',
		});
	//Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
	const result = ApiData.spells.find((spell) => spell.id === parseInt(id));
	if (result) return res.status(400).send({ msj: '"operation": "add spell", "status": "refused"' });
	//Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
	const newSpell = {
		id: +id,
		spell: spell,
		use: use,
	};
	ApiData.spells.push(newSpell);
	res.status(200).send({ msj: '"operation": "add spell", "status": "accepted"' });
});

app.listen(port, () => {
	console.log(`Express server started at port ${port}`);
});
