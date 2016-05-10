var dataModel = require('../modelos/datos');
/* GET home page */
module.exports.index = function (req, res) {
    res.render('index', { title: 'Express' });
    //console.log(req.headers.host);
};
module.exports.pagina = function(req, res){
res.render('pagina', { title: 'Express' });
};
module.exports.confirmacion = function (req, res) {
    res.render('confirmacion', { title: 'Express' });
};
module.exports.pedidoRealizado = function (req, res) {
    res.render('pedidoRealizado', { title: 'Express' });
};
var produc = {};
var pedidos = [];

module.exports.select=function(req, res)
{
    dataModel.getPedidos(function (error, data) {
        if (req.session) {
            req.session.id_ped = data[0].id;
            req.session.fecha = data[0].fecha;
            console.log("FECHA: " + req.session.fecha);
        }
    });
    dataModel.getProductos(function(error, data)
    {
        if (typeof data !== 'undefined')
        {
            req.session.datos = {};
            var text=" ";
            for(i=0;i<data.length;i++)
            {
                text += data[i].nombre + "\n";
                produc[i] = data[i];
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

module.exports.setProduc = function (req, res) {
    if (req.session) {
        var cantidades = {};
        var nombres = [];
        var identificadores = []
        var precios = [];
        var cont = 0;
        var pedido = req.session.id_ped;
        var dat = [];
        cantidades = req.body.pepito
        console.log(req.session.id_ped);
        for (i = 0; i < cantidades.length; i++) {
            var datos = {};
            if (cantidades[i] != "") {
                identificadores[cont] = produc[i].id;
                nombres[cont] = produc[i].nombre;
                precios[cont] = produc[i].precio;
                datos = { id: null, idPRODUCTOS: produc[i].id, idPEDIDOS: pedido, precio: produc[i].precio, cantidad: cantidades[i], num_mesa: 2 };
                pedidos[cont] = datos;
                dat[cont] = { nombre: produc[i].nombre, precio: produc[i].precio };
                //console.log(cantidad[i] + " " + produc[i]+" "+nombres[cont]);
                cont++;
            }
        }
        res.render('confirmacion', {
            title : 'Pedidos ', pedidos: dat
        });
        //res.redirect('/confirmacion');
        //console.log(nombres[0]);
        //console.log(nombres.length);
        //console.log(produc[0]);
        //console.log(cantidad.length);
       /* for (i = 0; i < nombres.length; i++) {
            console.log(identificadores[i] + " " + nombres[i] + " " + precios[i]);
        }
       res.render("confirmacion");
        for (i = 0; i < dat.length; i++)
            console.log(pedidos);*/
           // res.send(dat[i]);
            //rend.send(dat[i]);
    }
};
module.exports.insertProduct = function (req, res) {
    for (i = 0; i < pedidos.length; i++) {
        var ped = {};
        ped = pedidos[i];
        dataModel.setProductos(ped, function (error, data) {
            if (data && data.insertId) {
                res.render('pedidoRealizado');
            }
            else {
                res.json(500, { "msg": "Error" });
            }
        });
    }
};