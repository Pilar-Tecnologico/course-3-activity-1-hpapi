const { response } = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require("./data.json");
app.use(express.json());

app.get("/spells/:id", (req, res) => {
  const { id } = req.params;
  const spell = ApiData.spells.find((ele) => ele.id === Number(id));
  if (spell) {
    res.status(200).json(spell);
  } else {
    res.status(404).json({ spell: "unknown" });
  }
});

app.get("/characters", (req, res) => {
  const hh = req.query.hh;
  let response = [];
  if (hh) {
    response = ApiData.characters.filter(
      (ele) => ele.hogwartsStudent && ele.hogwartsHouse === hh
    );
  } else {
    response = ApiData.characters.filter((ele) => ele.hogwartsStudent);
  }
  if (response.length > 0) {
    res.status(200).json(response);
  } else {
    res.status(404).json({ House: hh, characters: "Not Found" });
  }
});

app.post("/spells", (req, res) => {
  const { id, spell, use } = req.body;
  if (!id || !spell || !use) {
    res.status(400).json({ operation: "add spell", status: "refused" });
  } else {
    res.status(200).json({ operation: "add spell", status: "accepted" });
  }
});

app.listen(port, () => {
  console.log(`Express server started at port ${port}`);
});
