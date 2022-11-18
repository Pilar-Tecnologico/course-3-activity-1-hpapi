var express = require('express');
var router = express.Router();


// Acá definimos las rutas

router.get('/', mainController.index);
router.get('/aboutus', mainController.aboutus);
router.get('/contact', mainController.contact);
router.get('/search', mainController.search);

// Acá exportamos el resultado
module.exports = router;