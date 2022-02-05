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
  const { spells } = ApiData;
  const response = spells.find((data) => Number(id) === data.id);
  if (!response) {
    res.status(400).json({
      code: "bad_request",
      message: "data not found",
      severity: "LOW",
    });
  }
  res.status(200).json(response)
});

app.get("/characters", (req, res) => {
  //Should use query params to filter the hogwartsHouse and hogwartsStudent
  const { house, student } = req.query;
  const { characters } = ApiData;
  if (house && student) {
    const response = characters.filter(
      (character) =>
        house === character.hogwartsHouse &&
        student === String(character.hogwartsStudent)
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
  const { id, spell, use } = req.body;
  if (id && spell && use) {
    res.status(200).json({ operation: "add spell", status: "accepted" });
  } else {
    res.status(400).json({ operation: "add spell", dstatus: "refused" });
  }
});

app.listen(port, () => {
  console.log(`Express server started at port ${port}`);
});
