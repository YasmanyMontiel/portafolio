'use strict'

var mongoose = require('mongoose');   //creo una variable y con la funcion require de nodejs importo el paquete de mongoose para realizar la conexion a la base de datos, teniendo un objeto en la variable
var app = require('./app');
var hostname = "localhost";
var port = 3700;

mongoose.set('useFindAndModify', false);    //solucionar estos problemas y avisos de Mongoose
mongoose.Promise = global.Promise; //para realizar la conexión a la bd, le indico a la variable que es una promesa
mongoose.connect('mongodb://localhost:27017/portafolio', { useNewUrlParser:true, useUnifiedTopology: true })    //realizo la conección indicandole la ruta de mi bd
        .then(()=>{                                         //funcion de callback
            console.log("Established connection to the database...");

            //Node server creation
            app.listen(port, hostname, () => {
                console.log("Server runing at: localhost:3700...")
            })

        })
        .catch(err => console.log(err));
        