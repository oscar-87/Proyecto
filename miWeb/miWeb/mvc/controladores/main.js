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
/*module.exports.pedidoRealizado = function (req, res) {
    res.render('pedidoRealizado', { title: 'Express' });
};*/
var produc = {};
var pedidos = [];

module.exports.select=function(req, res)
{
    var ip =req.connection.remoteAddress;
    dataModel.getPedidos(function (error, data) {
        if (req.session) {
            req.session.id_ped = data[0].id;
            req.session.fecha = data[0].fecha;
            console.log("FECHA: " + req.session.fecha);
        }
    });
    console.log(ip);
    dataModel.getProductos(function(error, data)
    {
        if (typeof data !== 'undefined')
        {
            req.session.datos = {};
            var text=" ";
            for(i=0;i<data.length;i++) {
               // produc = {};
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
var p=0;
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
        cantidades = req.body.cantidad
        //console.log(req.session.id_ped);
        //console.log(cantidades.length);
        for (i = 0; i < cantidades.length; i++) {
            var datos = {};
            if (cantidades[i] != "") {
                identificadores[cont] = produc[i].id;
                nombres[cont] = produc[i].nombre;
                precios[cont] = produc[i].precio;
                datos = { id: null, idPRODUCTOS: produc[i].id, idPEDIDOS: pedido, precio: produc[i].precio, cantidad: cantidades[i], num_mesa: 2 };
                pedidos[cont] = datos;
                dat[cont] = { cantidad: cantidades[i], nombre:produc[i].nombre};
                //console.log(cantidad[i] + " " + produc[i]+" "+nombres[cont]);
                console.log("Precio "+produc[i].precio);
                cont++;
            }
            console.log(dat);
        }
        res.render('confirmacion', {
            title : 'Pedidos ', pedidos: dat
        });
    }
};
module.exports.insertProduct = function (req, res) {
    var datosPedido = [];
    var datos;
    var correcto = true;
    console.log("pedido:"+pedidos.length);
    for (i = 0; i < pedidos.length; i++) {
        var ped = {};
        var prd = 0, precio = 0, cant = 0, mesa = 0;
        ped = pedidos[i];
        datosPedido[i] = ped;
        prd = ped.idPRODUCTOS;
        cant = ped.cantidad;
        precio = ped.precio * cant;
        console.log("Prec:"+precio);
        mesa = ped.num_mesa;
        dataModel.setProductos(parseInt(p), parseInt(prd),parseFloat(precio), parseInt(cant), parseInt(mesa), function (error, data) {
            if (data && data.insertId) {
                correcto = false;
            //res.redirect('/pedidoRealizado');
            }

        });
    }
    if (correcto)
        res.render('pedidoRealizado');
    else
        res.json(500, { "msg": "Error" });
};
module.exports.totalFactura = function (req, res) {
    var importe = 0;
    var ped = req.session.id_ped;
    console.log("Pedidooooo:"+ped);
    dataModel.getPedidoActual(ped, function (error, data) {
        importe = data[0].Total;
        dataModel.setImporte(parseInt(ped),parseFloat(importe), function (error2, data1) {
            console.log("Pedido:"+ped);
            console.log("Importe:"+importe);
            if (data1 && data1.msg) {
            //res.render('TotalFactura');
                res.render('TotalFactura', {
                    title : 'Importe ', total: data
                });
            // res.redirect("/TotalFactura" + req.param('id'));
            }
            else {
                res.json(500, { "msg": "Error" });
                console.log("no se ha insertado");
            }
        });
    });
};