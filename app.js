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
  const filterSpells = ApiData.spells;
  const response = filterSpells.find((spell) => Number(id) === spell.id);
  res.json(response);
});

app.get("/characters", (req, res) => {
  //Should use query params to filter the hogwartsHouse and hogwartsStudent
  const { hogwartsHouse, hogwartsStudent } = req.query;
  if (hogwartsHouse && hogwartsStudent) {
    const filterCharacters = ApiData.characters;
    const response = filterCharacters.filter(
      (character) =>
        hogwartsHouse === character.hogwartsHouse &&
        Boolean(hogwartsStudent) === character.hogwartsStudent
    );
    res.json(response);
  } else {
    res.status(400).json({
      code: "bad_request",
      message: "Invalid request, check your query params",
      severity: "LOW",
    });
  }
});

app.post("/spells", (req, res) => {
  //Should recive spell data from request body.
  //Should validate that the properities "id", "spell" and "use" are present in the body
  //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
  //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
  const data = req.body;
  if (data.id && data.spell && data.use) {
    res.json({ operation: "add spell", status: "accepted" });
  } else {
    res.status(400).json({ operation: "add spell", status: "refused" });
  }
});

app.listen(port, () => {
  console.log(`Express server started at port ${port}`);
});
