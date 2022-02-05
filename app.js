//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require("./data.json"); //should require the data.json file
app.use(express.json());

app.get("/spells/:id", (req, res) => {
  const filteredSpell = ApiData.spells.find(
    (spell) => req.params.id == spell.id
  );
  filteredSpell ? res.json(filteredSpell) : res.sendStatus(404);
});

app.get("/characters", (req, res) => {
  //Should use query params to filter the hogwartsHouse and hogwartsStudent
});

app.post("/spells", (req, res) => {
  console.log(req.body);
  res.send(req.body);

  //Should recive spell data from request body.
  //Should validate that the properities "id", "spell" and "use" are present in the body
  //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
  //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
});

app.listen(port, () => {
  console.log(`Express server started at port ${port}`);
});
