import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Project} from '../models/project';
import {Global} from './global';

@Injectable()   //Mi decorador
export class ProjectService{
    public url: string;
    constructor(
        private _http: HttpClient
    ){
        this.url= Global.url;
    }
    testService(){
        return 'Probando el servicio de angular';
    }
    saveProject(project: Project): Observable<any>{
        let params = JSON.stringify(project); //objeto json de tipo project, que se enviará a la bd
        let header = new HttpHeaders().set('content-type', 'application/json');//Estableciendo las cabeceras, es decir, cómo se va a enviar la información y en qué formato
        return this._http.post(this.url+'create-project', params, {headers: header});//se le pasa como parámetros, la url de nustra api más el método del api 
        //que voy a usar, en este caso la ruta, como segundo parámetro le paso los params a guardar en la bd y por último le paso los headers
    }
    getProjects(): Observable<any>{ 
        let headers = new HttpHeaders().set('content-type', 'application/json');
        return this._http.get(this.url+'projects', {headers: headers});
    }
    getProject(id): Observable<any>{
        let headers = new HttpHeaders().set('content-type', 'application/json');
        return this._http.get(this.url+'project/'+id, {headers: headers});
    }
    deleteProject(id): Observable<any>{
        let headers = new HttpHeaders().set('content-type', 'application/json');
        return this._http.delete(this.url+'project/'+id, {headers: headers});
    }
    updateProject(project): Observable<any>{
        let params = JSON.stringify(project); //convierto mi objeto project a JSON
        let headers = new HttpHeaders().set('content-type', 'application/json');
        return this._http.put(this.url+'project/'+project._id, params, {headers: headers});
    }
}
