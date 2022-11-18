const express = require('express');
const router = express.Router();
const { showSpell } = require('../../controllers/api/spellsApiController');

router.get('/:id', showSpell);


module.exports = router;

