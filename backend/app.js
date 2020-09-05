'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();


//Load paths files
var project_routes = require('./routes/project');

//middleweres
app.use(bodyParser.urlencoded({extended:false}));   //configuración necesaria para body-parser
app.use(bodyParser.json());                           //Cualquier tipo de petición que llegue la convierte a .json

//Setup HEADERS AND CORS  
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//ROUTES
app.use('/', project_routes);

//Export
module.exports = app;   //Exportando el módulo app