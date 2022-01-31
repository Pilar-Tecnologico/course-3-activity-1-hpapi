//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require("express");
const app     = express();
const port    = process.env.PORT || 3000;
const ApiData = require("./data.json"); //should require the data.json file

app.use(express.json());
app.use(express.urlencoded({extended : false}))

//should respond with the spell with the corresponding id value from data.json
app.get("/spells/:id", (req, res) => {
    const id = Number(req.params.id);

	if (id && id > 0) {
        res.status(200).json({
            spell   : ApiData.spells.find((spell) => id === spell.id)
        });
  } else {
        res.status(400).json({
            message : "Bad request. Invalid or insufficient Id.",
        });
  }

});

//Should use query params to filter the hogwartsHouse and hogwartsStudent
app.get("/characters", (req, res) => {
    const { hogwartsHouse, hogwartsStudent } = req.query;

    if(hogwartsHouse && hogwartsStudent) {
        res.status(200).json({
            characters : ApiData.characters.filter((character) => JSON.parse(hogwartsStudent.trim().toLowerCase()) === character.hogwartsStudent && hogwartsHouse.trim().toLowerCase() === character.hogwartsHouse.toLowerCase())  
        })
    } else {
        res.status(400).json({
            message :  "Bad request. Invalid or insufficient params."
        })
    }

});

//Should recive spell data from request body.
//Should validate that the properities "id", "spell" and "use" are present in the body
//Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
//Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
app.post("/spells", (req, res) => {
    const { id, spell, use } = req.body;

    if(id && spell && use) {
        res.status(200).json({
            operation : "add spell",
            status    : "accepted", 
        })
    } else {
        res.status(400).json({
            operation : "add spell",
            status    : "refused", 
        })
    }

});

app.listen(port, () => {
  console.log(`Express server started at port ${port}`);
});
