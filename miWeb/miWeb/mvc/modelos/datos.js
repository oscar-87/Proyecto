require('date-utils');
//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
connection = mysql.createConnection(
    { 
        host: 'localhost', 
        user: 'root',  
        password: '', 
        database: 'restaurante'
    }
);
//creamos un objeto para ir almacenando todo lo que necesitemos
var dataModel = {};
//obtenemos todos los productos
dataModel.getProductos = function(callback)
{
    if (connection) 
    {
        connection.query('SELECT * FROM productos ORDER BY id', function(error, rows) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
};
dataModel.getPedidos = function(callback)
{
    if (connection) 
    {
        connection.query('SELECT * FROM pedidos ORDER BY id desc', function(error, rows) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        });
    }
};
dataModel.setPedido = function(callback)
{
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    var fechaActual = dd + "/" + mm + "/" + yyyy;
    var f={fecha:fechaActual};
    if (connection) 
    {
        connection.query('INSERT INTO pedidos SET ?',f, function(error, result) {
            if(error)
            {
                throw error;
            }
            else
            {
                callback(null,{"insertId" : result.insertId});
            }
        });
    }
};

dataModel.setProductos = function (pedidos,callback) {
    if (connection) {
        connection.query('INSERT INTO pedidoproductos SET ?', pedidos, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "insertId" : result.insertId });
            }
        });
    }
};
dataModel.getPedidoActual = function (pedido, callback) {
    if (connection) {
        connection.query('SELECT Round(sum(precio),2) as Total FROM pedidoproductos where idPEDIDOS=? ',pedido, function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
};
dataModel.setImporte = function (pedido,importe,callback) {
    if (connection) {
        connection.query('UPDATE pedidos SET Importe =' + importe + ' where id=' + pedido, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "success" });
            }
        });
    }
};
//exportamos el objeto para tenerlo disponible en la zona de rutas 
module.exports = dataModel;