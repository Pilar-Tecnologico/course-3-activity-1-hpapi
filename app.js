//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require("./data.json"); //should require the data.json file
app.use(express.json());

app.get("/spells/:id", (req, res) => {
  const { id } = req.params;
  const response = ApiData["spells"].find(
    (element) => Number(id) === element.id
  );
  res.json(response);
  //should respond with the spell with the corresponding id value from data.json
});

app.get("/characters", (req, res) => {
  const { hogwartsHouse, hogwartsStudent } = req.query;
  if (hogwartsStudent && hogwartsHouse) {
    const response = ApiData["characters"].filter(
      (element) =>
        hogwartsHouse === element.hogwartsHouse &&
        hogwartsStudent === element.hogwartsStudent.toString()
    );
    res.json(response);
  } else {
    res.status(400).json({
      code: "bad_request",
      message: "Invalid request, check your query params",
      severity: "LOW",
    });
  }
  //Should use query params to filter the hogwartsHouse and hogwartsStudent
});

app.post("/spells", (req, res) => {
  const data = req.body;
  if (data.id && data.spell && data.use) {
    res.json({ operation: "add spell", status: "accepted" });
  } else {
    res.status(400).json({ operation: "add spell", status: "refused" });
  }
  //Should recive spell data from request body.
  //Should validate that the properities "id", "spell" and "use" are present in the body
  //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
  //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
});

app.listen(port, () => {
  console.log(`Express server started at port ${port}`);
});
