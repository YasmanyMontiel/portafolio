import { Component, OnInit } from '@angular/core';
import {Project} from '../../../models/project';                    //Importo mi modelo
import {ProjectService} from '../../../services/project.service';   //Importo mi servicio
import {UploadService} from '../../../services/upload.servise';
import {Global} from '../../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html', //Reutilizando una vista
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService] //Cargando mi servicio dentro de la propiedad providers de mi decorador
})
export class EditComponent implements OnInit {
  public title: string;
  public status: string;
  public saveProject;
  public project: Project;  //Objeto que modificará el formulario
  public filesToUpload: Array<File>;
  public url:string;
  constructor(
    //creando las propiedades del servicio
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.title = "Editar proyecto";
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id); 
    })
  }
  getProject(id){
    this._projectService.getProject(id).subscribe(
      Response => {
        this.project = Response.project;
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
  onSubmit(){
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if(response.project) {
          
          //Subir la imagen 
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image').then((result:any) => {
              this.saveProject = result.project;
              this.status = 'success';
              console.log(result);         
            });   
          }else{
            this.saveProject = response.project;
              this.status = 'success';
              console.log(response); 
          }      
        }else {
          this.status = 'failed';
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
  fileChangeEvent(fileInput: any){
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
