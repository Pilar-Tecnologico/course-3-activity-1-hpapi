const express = require('express');
const router = express.Router();
const { showSpell, addSpell} = require('../../controllers/api/spellsApiController');

router.get('/:id', showSpell);

router.post('/', addSpell)


module.exports = router;

