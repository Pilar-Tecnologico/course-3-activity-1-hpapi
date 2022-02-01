//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require("./data.json"); //should require the data.json file
app.use(express.json());

app.get("/spells/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  if (id > 0 && id < 73) {
    const spell = ApiData.spells.find((spell) => spell.id === id);
    res.status(200).json(spell);
  } else {
    res.status(404).json({ message: "id not found" });
  }
  //should respond with the spell with the corresponding id value from data.json
});

app.get("/characters", (req, res) => {
  const { house, student } = req.query;

  if (house && student) {
    const isStudent = student === "true" ? true : false;
    //find student
    if (isStudent) {
      const charaStudent = ApiData.characters.filter(
        (student) =>
          student.hogwartsHouse === house && student.hogwartsStudent === true
      );
      charaStudent.length < 1
        ? res.status(200).json({ message: "characters not found" })
        : res.status(200).json(charaStudent);
    } else {
      // find no student
      const charaNoStudent = ApiData.characters.filter(
        (student) =>
          student.hogwartsStudent === false && student.hogwartsHouse === house
      );

      charaNoStudent.length < 1
        ? res.status(200).json({ message: "characters not found" })
        : res.status(200).json(charaNoStudent);
    }
  } else {
    res.status(400).json({
      code: "bad_request",
      message: "bad query params",
      severity: "low",
    });
  }
  //Should use query params to filter the hogwartsHouse and hogwartsStudent
});

app.post("/spells", (req, res) => {
  const { id, spell, use } = req.body;
  if (typeof id === "number" && spell && use) {
    res.status(200).json({ operation: "add spell", status: "accepted" });
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
