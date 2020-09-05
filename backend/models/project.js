'use strict'
var mongoose = require('mongoose'); //Importando el módulo mongoose que me permite trabajar con la BD
var Schema = mongoose.Schema; //Defino un esquema de un modelo y accedo a ese objeto
var ProjectSchema = Schema ({    //Creando el esquema de project, objeto molde que voy a usar para crear nuevos projectos, nuevos documentos de este tipo en nuestra BD
name: String,                    //Se le pasa como parámetros un objeto .json con todas sus propiedades
description: String,
category: String,
year: Number,
langs: String,
image: String,
});
module.exports = mongoose.model('Project', ProjectSchema);  //Exportar este módulo y poder inportarlo en otrs ficheros
//Tomo este esquema y lo uso como modelo, con dos parámetros
//Parámetro 1: nombre de mi entidad en singular y con la primera en Mayúscula, será el tipod eentidad que se guardará en la BD
//Segundo parámetro el esquema que diceñé
//Si existe la entidad en la BD, guarda los documentos en esa colección