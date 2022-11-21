//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman or Thunder Client is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const spellsApiRouter = require('./routes/api/spellsApiRoutes');
const charactersApiRouter = require('./routes/api/charactersApiRoutes');
app.use(express.json());

app.use('/spells', spellsApiRouter);
      
app.use('/characters', charactersApiRouter);

app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
});