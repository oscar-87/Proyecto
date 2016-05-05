var express = require('express');
var router = express.Router();
var controlador = require('../controladores/main');

/* GET home page. */
router.get('/', controlador.index);
router.post('/pagina',controlador.insert);
router.get('/pagina',controlador.select);
router.get('/pagina',controlador.selectPedidos);

module.exports = router;
