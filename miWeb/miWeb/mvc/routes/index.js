var express = require('express');
var router = express.Router();
var controlador = require('../controladores/main');

/* GET home page. */
router.get('/', controlador.index);
router.post('/pagina', controlador.insert);
router.get('/pagina', controlador.select);
router.post('/confirmacion', controlador.setProduc);
router.post('/pedidoRealizado', controlador.insertProduct);
router.post('/TotalFactura', controlador.totalFactura);
//router.post('/TotalFactura', controlador.setImp);

module.exports = router;
/*borrar luego*/