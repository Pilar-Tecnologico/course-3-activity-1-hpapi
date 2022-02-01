//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require("./data.json"); //should require the data.json file
app.use(express.json()); // Esto permite que express entienda los json

console.log(ApiData.spells[0].id);

app.get("/spells/:id", (req, res) => {
  //should respond with the spell with the corresponding id value from data.json
  const spell = ApiData.spells.find(e => `${e.id}` === req.params.id)
  res.send(`id:${spell.id}\n
            spell:${spell.spell}\n
            use:${spell.use}`);
});

app.get("/characters", (req, res) => {
  //Should use query params to filter the hogwartsHouse and hogwartsStudent
});

app.post("/spells", (req, res) => {
  //Should recive spell data from request body.
  //Should validate that the properities "id", "spell" and "use" are present in the body
  //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
  //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
});

app.listen(port, () => {
  console.log(`Express server started at port ${port}`);
});
