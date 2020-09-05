'use strict'
var Project = require('../models/project');
var fs = require('fs'); //Libreria fileSystem
var path = require('path'); //load phisic path

var controller = {
    home: function(req, res ){
        return res.status(200).send(
            "<h1> Home Page...<h1>"
            )
    },
    contact: function (req, res) {
        return res.status(200).send(
            "<h1> Contact Page...<h1>"
        )
    },
    createProject: function (req, res){
        var project = new Project();    //Creando una nueva instancia, un objeto project
        var params  = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;
        //para guardar en la BD
        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar el documento...'});
            if(!projectStored)  return res.status(404).send({message: 'No se ha podido guardar el projecto...'});
            return res.status(200).send({project: projectStored});
        });   
    },
    getProject: function (req, res){
        var projectId = req.params.id;
            if(projectId == null) return res.status(404).send({message: 'El proyecto no existe...'});

        Project.findById(projectId, (err, project) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos...'});
            if(!project) return res.status(404).send({message: 'El proyecto no existe...'});
            return res.status(200).send({project});
        });
    },
    getProjects: function (req, res){
        Project.find({}).sort('year').exec((err, projects) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los projects...'});
            if(!projects) return res.status(404).send({message: 'No hay projects para mostrar...'});
            return res.status(200).send({projects});
        });
    },
    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;
        Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdate) => {
            if(err) return res.status(500).send({message: 'Error al actualizar...'});
            if(!projectUpdate) return res.status(404).send({message: 'No se ha podido actualizar el proyecto...'});
            return res.status(200).send({project: projectUpdate});
        });
    },
    deleteProject: function(req, res){
        var projectId = req.params.id;
        Project.findOneAndDelete(projectId, (err, projectDelete) => {
            if(err) return res.status(500).send({message: 'Error al eliminar el proyecto...'});
            if(!projectDelete) return res.status(404).send({message: 'Error, no existe el proyecto...'});
            return res.status(200).send({project: projectDelete});
        });
    },
    uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

        if(req.files){ //usando el connect-multiparty para recoger ficheros por ña reques, porque por defecto no existe en js, por eso se usa este módulo      
                //console.log(req.files);
                var filePath = req.files.image.path;
                var fileSplit = filePath.split('\\');
                var fileName = fileSplit[1];
                var extSplit = fileName.split('\.');    //tomando la extensión del fichero
                var fileExt = extSplit[1];  //Tomando el valor de la extensión del fichero

                if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){//comprobando extensión antes de guardar en bd
                    Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdate) => {
                        if(err) return res.status(500).send({message: 'Imagen no guardada...'});
                        if(!projectUpdate) return res.status(404).send({message: 'El proyecto no existe...'});
                        return res.status(200).send({project: projectUpdate});
                    });
                }
                else{//Si la extensión no es correcta elimino el archivo del directorio de uploads
                    fs.unlink(filePath, (err) => {
                        return res.status(200).send({message: 'La extensión no es válida'});
                    });
                }               
			}

		else{
			return res.status(200).send({
				message: fileName
			});
		}

    },
    getImageFile: function(req, res){
		var file = req.params.image;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}
};
module.exports = controller;