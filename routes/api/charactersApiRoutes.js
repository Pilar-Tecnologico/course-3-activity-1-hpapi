const express = require('express');
const router = express.Router();
const { filterCharacter } = require('../../controllers/api/charactersApiController');

router.get('/', filterCharacter);


module.exports = router;

