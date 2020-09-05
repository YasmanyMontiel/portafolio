'use strict'
var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' }); //Indicando en qué directorio se van a subir los archivos

router.get('/api', ProjectController.home);
router.get('/api/contact', ProjectController.contact);
router.post('/api/create-project', ProjectController.createProject);
router.get('/api/project/:id?', ProjectController.getProject);
router.get('/api/projects', ProjectController.getProjects);
router.put('/api/project/:id', ProjectController.updateProject);
router.delete('/api/project/:id', ProjectController.deleteProject);
router.post('/api/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);    //Se pasa el Middleware como segundo parametro para que se ejecute
router.get('/api/get-image/:image', ProjectController.getImageFile);
module.exports = router;