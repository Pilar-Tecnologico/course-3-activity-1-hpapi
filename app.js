//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require("./data.json"); //should require the data.json file
app.use(express.json());

app.get("/spells/:id", (req, res) => {
  //should respond with the spell with the corresponding id value from data.json

  const { id } = req.params;

  const spells = ApiData.spells.find((spell) => spell.id == id);
  res.json(spells);
});

app.get("/characters", (req, res) => {
  //Should use query params to filter the hogwartsHouse and hogwartsStudent
  const { hogwartsStudent, hogwartsHouse } = req.query;

  if (!hogwartsHouse && !hogwartsStudent) {
    res.json(ApiData.characters);
  }

  const result = ApiData.characters.filter((character) => {
    //    If statements to satisfy one or two conditions present on req.query
    if (!hogwartsStudent) {
      return character.hogwartsHouse == hogwartsHouse;
    }
    if (!hogwartsHouse) {
      return character.hogwartsStudent == JSON.parse(hogwartsStudent);
    }
    return (
      character.hogwartsStudent == JSON.parse(hogwartsStudent) &&
      character.hogwartsHouse == hogwartsHouse
    );
  });

  res.json(result);
});

app.post("/spells", (req, res) => {
  //Should recive spell data from request body.
  //Should validate that the properities "id", "spell" and "use" are present in the body
  //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
  //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.

  const data = req.body;
  if (!data.id || !data.spell || !data.use) {
    res.status(400).json({
      operation: "add spell",
      status: "refused",
    });
  }
  ApiData.spells.push(data);
  res.status(200).json({
    operation: "add spell",
    status: "accepted",
  });
});

app.listen(port, () => {
  console.log(`Express server started at port ${port}`);
});
