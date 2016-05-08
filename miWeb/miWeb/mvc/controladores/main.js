var dataModel = require('../modelos/datos');
/* GET home page */
module.exports.index = function(req, res){
res.render('index', { title: 'Express' });
};
module.exports.pagina = function(req, res){
res.render('pagina', { title: 'Express' });
};
var produc= {};
module.exports.select=function(req, res)
{
    dataModel.getProductos(function(error, data)
    {
        dataModel.getPedidos(function (error, data) {
            if (req.session) {
                req.session.id_ped = data[0].id;
                req.session.fecha = data[0].fecha;
                console.log("ID: " + req.session.id_ped);
                console.log("FECHA: " + req.session.fecha);
                console.log(req.ip);
            }
        });
        if (typeof data !== 'undefined')
        {
            req.session.datos = {};
            var text=" ";
            for(i=0;i<data.length;i++)
            {
                text += data[i].nombre + "\n";
                produc[i] = data[i].nombre;
                req.session.datos[i] = data[i].id;
            }
            res.render('pagina',{ 
                title : 'Productos ',datos:text,tamanio:data.length,productos:data
                });
        }
        //en otro caso mostramos un error
        else
        {
            res.json(404,{"msg":"notExist"});
        }
    });
};

module.exports.insert = function(req,res)
{
    dataModel.setPedido(function(error, data)
    {
        res.redirect('/pagina');
    });
};

module.exports.setProductos = function (req, res) {
    var cantidad = {};
    cantidad = req.body.pepito
    for (i = 0; i < cantidad.length; i++)
        console.log(cantidad[i]);

    console.log(produc[0]);
    console.log(cantidad.length);
    res.send("Recibimos tus datos");

};