//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require("./data.json"); //should require the data.json file
app.use(express.json()); // Esto permite que express entienda los json

app.get("/spells/:id", (req, res) => {
  //should respond with the spell with the corresponding id value from data.json
  const spell = ApiData.spells.find((e) => `${e.id}` === req.params.id);
  res.send(`id:${spell.id}\n
            spell:${spell.spell}\n
            use:${spell.use}`);
});

app.get("/characters/:nickname", (req, res) => {
  //Should use query params to filter the hogwartsHouse and hogwartsStudent
  const nickname = ApiData.characters.filter(
    (e) => `${e.nickname}` === req.params.nickname
  )[0];
  res.send(`
			  character: ${nickname.character}</br>
			  isHogwartsStudent:${nickname.hogwartsStudent}</br>
			  hogwartsHouse:${nickname.hogwartsHouse}</br>`);
});


app.post("/spells", (req, res) => {
	//Should recive spell data from request body.
	const {spell} = req.body; // -> Lo que paso al post (información a postear)
	const hasSpell = 'spell' in req.body;
	const hasId = 'id' in req.body && typeof req.body.id === 'number'
	const hasUse = 'use' in req.body;

	if(hasSpell && hasId && hasUse){
		res.status(200).send(
			{
				"operation":"add spell",
				"status":"accepted"
			}
		);
		return
	}

	res.status(400).send(
		{
			"operation":"add spell",
			"status":"refused"
		}
	)
   //Should validate that the properities "id", "spell" and "use" are present in the body
  //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
  //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
});

app.listen(port, () => {
  console.log(`Express server started at port ${port}`);
});
