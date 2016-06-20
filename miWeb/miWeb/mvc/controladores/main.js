var dataModel = require('../modelos/datos');
/* GET home page */
module.exports.index = function (req, res) {
    res.render('index');
};
module.exports.pagina = function(req, res){
res.render('pagina');
};
module.exports.confirmacion = function (req, res) {
    res.render('confirmacion');
};
module.exports.pedidoRealizado = function (req, res) {
    res.render('Pedido Realizado');
};
module.exports.totalFacturas = function (req, res) {
    res.render('Total Factura');
};
var produc = {};
var mesa="";
module.exports.select=function(req, res)
{
    var ip = req.connection.remoteAddress;
    dataModel.getPedidos(function (error, data) {
        if (req.session) {
            req.session.id_ped = data[0].id;
            req.session.fecha = data[0].fecha;
        }
    });
    var m = "";
    var c = 0;
    var salir = false;
   /* var i = ip.length-1;
    while (ip[i] != ".") {
        m += ip[i]
        i--;
    }*/
    for (i = 0; i < ip.length-1; i++) {
        if (ip[i] == ".")
            c++;
        if (c == 3)
            mesa += ip[i+1]
    }
    dataModel.getProductos(function(error, data)
    {
        if (typeof data !== 'undefined')
        {
            req.session.datos = {};
            var text=" ";
            for(i=0;i<data.length;i++) {
                text += data[i].nombre + "\n";
                produc[i] = data[i];
                req.session.datos[i] = data[i].id;
            }
            res.render('pagina',{ 
                title : 'Productos ',datos:text,tamanio:data.length,productos:data
                });
        }//en otro caso mostramos un error
        else{
            res.json(404,{"msg":"notExist"});}
    });
};

module.exports.insert = function(req,res)
{
    dataModel.setPedido(function(error, data)
    {
        res.redirect('/pagina');
    });
};
var p = 0;
var pedidos = [];
module.exports.setProduc = function (req, res) {
    if (req.session) {
        var cantidades = {};
        var nombres = [];
        var identificadores = []
        var precios = [];
        var cont = 0;
        var pedido = req.session.id_ped;
        p = pedido;
        var dat = [];
        var pedRealizado={};
        cantidades = req.body.cantidad
        for (i = 0; i < cantidades.length; i++) {
            var datos = {};
            if (cantidades[i] != "") {
                identificadores[cont] = produc[i].id;
                nombres[cont] = produc[i].nombre;
                precios[cont] = produc[i].precio;
                datos = { id: null, idPRODUCTOS: produc[i].id, idPEDIDOS: pedido, precio: produc[i].precio * cantidades[i], cantidad: cantidades[i], num_mesa: mesa };
                pedidos[cont] = datos;
                console.log(cont);
                dat[cont] = { cantidad: cantidades[i],nombre: produc[i].nombre, precio: produc[i].precio*cantidades[i] };
                cont++;
            }
        }
        res.render('confirmacion', {
            title : 'Pedidos ', pedidos: dat, canti:cantidades
        });
    }
};
module.exports.insertProduct = function (req, res) {
    var datosPedido = [];
    var datos;
    var correcto = true;
    var cont = 0;
    for (i = 0; i < pedidos.length; i++) {
        dataModel.setProductos(pedidos[i], function (error, data) {
            if (data && data.insertId) {
                correcto = false;
            }
        });    }
    if (correcto)
        res.render('pedidoRealizado');
    else
        res.json(500, { "msg": "Error" });
    pedidos = [];
};
module.exports.totalFactura = function (req, res) {
    var importe = 0;
    var ped = req.session.id_ped;
    dataModel.getPedidoActual(ped, function (error, data) {
        importe = data[0].Total;
        dataModel.setImporte(parseInt(ped),parseFloat(importe), function (error2, data1){
            if (data1 && data1.msg) {
                res.render('TotalFactura', {
                    title : 'Importe ', total: data
                });
            }
            else {
                res.json(500, { "msg": "Error" });
            }
        });
    });
};