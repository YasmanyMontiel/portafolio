import { Component, OnInit } from '@angular/core';
import {Project} from '../../../models/project';                    //Importo mi modelo
import {ProjectService} from '../../../services/project.service';   //Importo mi servicio
import {UploadService} from '../../../services/upload.servise';
import {Global} from '../../../services/global';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService] //Cargando mi servicio dentro de la propiedad providers de mi decorador
})
export class CreateComponent implements OnInit {

  public title: string;
  public status: string;
  public saveProject
  public project: Project;  //Objeto que modificará el formulario
  public filesToUpload: Array<File>;
  constructor(
    //creando las propiedades del servicio
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) { 
    this.title = "Crear un nuevo proyecto";
    this.project = new Project('','','','',2020,'','');
  }

  ngOnInit(): void {
  }
  onSubmit(form){
    console.log(this.project);
    //Guardar los datos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if(response.project) {
          
          //Subir la imagen 
          if(this.filesToUpload){
          this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image').then((result:any) => {
            this.saveProject = result.project;
            this.status = 'success';
            console.log(result);
            form.reset();
          });
        }else{
          this.saveProject = response.project;
          this.status = 'success';
            form.reset();
        }

        }else {
          this.status = 'failed';
        }
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  fileChangeEvent(fileInput: any){
    console.log(fileInput);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
