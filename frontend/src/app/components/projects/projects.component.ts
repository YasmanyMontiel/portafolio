import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project';  //model
import { ProjectService } from '../../../services/project.service'; //service
import { Global } from '../../../services/global'; //url global

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService] //load service
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public url: string;
  constructor(
    private _projectService: ProjectService
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }
getProjects(){
  this._projectService.getProjects().subscribe(
    response => {
      if(response.projects){
        this.projects = response.projects;
      }
      console.log(response);
    },
    error =>{
      console.log(<any>error);
    }
  );
}
}
