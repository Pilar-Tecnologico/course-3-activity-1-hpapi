//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ApiData = require('./data.json'); //should require the data.json file
app.use(express.json());

app.get('/spells/:id', (req, res) => {
  //should respond with the spell with the corresponding id value from data.json
  const { id } = req.params;
  try {
    const resp = ApiData.spells.find((spell) => +id === spell.id);
    if (!resp) {
      throw new Error(
        'The ID provided did not find the spellThe identification provided did not find the spell',
        { cause: { code: '400 (bad_request)', param: id } },
      );
    }
    res.status(200).json({ succes: true, spell: resp });
  } catch (err) {
    res.status(400).json({
      menssage: err.message,
      cause: err.cause,
    });
  }
});

app.get('/characters', (req, res) => {
  //Should use query params to filter the hogwartsHouse and hogwartsStudent
  try {
    const { hogwartsStudent, hogwartsHouse } = req.query;
    let resp;

    if (hogwartsHouse && hogwartsStudent) {
      resp = ApiData.characters.filter(
        (character) =>
          (hogwartsHouse === character.hogwartsHouse &&
            !!hogwartsStudent === character.hogwartsStudent) ||
          hogwartsHouse === character.hogwartsHouse,
      );

      if (!resp.length) {
        throw new Error('No match found', {
          cause: {
            code: 400,
            description: 'bad_request',
            querys: { hogwartsHouse, hogwartsStudent },
          },
        });
      }
    } else {
      throw new Error('lack of query parameters', {
        cause: { code: 400 },
      });
    }

    res.status(200).json({ succes: true, characters: resp });
  } catch (err) {
    res.status(400).json({
      menssage: err.message,
      cause: err.cause,
    });
  }
});

app.post('/spells', (req, res) => {
  //Should recive spell data from request body.
  //Should validate that the properities "id", "spell" and "use" are present in the body
  //Response should be {"operation": "add spell", "status": "accepted"} with status 200 if all the valid properities are present
  //Response should be {"operation": "add spell", "status": "refused"} with status 400 if there is any properitie missing.
  const { spell, use } = req.body;
  try {
    const spells = ApiData.spells;

    if (spell && use) {
      const id = spells.length + 1;
      const sendSpell = spells.push({ id, spell, use }) - 1;
      const newSpell = spells[sendSpell];
      res.status(200).json({ operation: 'add spell', status: 'accepted', spell: newSpell });
    } else {
      throw new Error('syntax error', {
        cause: {
          code: 400,
          description: 'bad_request',
          querys: { hogwartsHouse, hogwartsStudent },
        },
      });
    }
  } catch (err) {
    res.status(400).json({ operation: 'add spell', status: 'refused', cause: err.cause });
  }
});

app.listen(port, () => {
  console.log(`Express server started at port ${port}`);
});
