import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';  //model
import { ProjectService } from '../../../services/project.service'; //service
import { Global } from '../../../services/global'; //url global
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url:string;
  public project: Project;
  public confirm:boolean;
  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.url = Global.url;
    this.confirm = false;
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
  setConfirm(confirm){
    this.confirm = confirm;
  }
  deleteProject(id){
    this._projectService.deleteProject(id).subscribe(
      Response =>{
        if(Response.project){
          this._router.navigate(['/projects']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
