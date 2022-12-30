import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestResponse } from 'src/app/interface/RestResponse';
import { environment } from 'src/environments/environment';
import { Role } from '../../interface/Role';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url:string = environment.urlBase;

  constructor(private http:HttpClient) { }

  getParametros() : Observable<any>{
    return this.http.get(`${this.url}/v1/role`);
  }

  getById(id : number) : Observable<RestResponse>{
    return this.http.get<RestResponse>(`${this.url}/role/${id}`);
  }

  updateRolEstado(rol : Role) : Observable<RestResponse>{
    return this.http.put<RestResponse>(`${this.url}/role/estado`, rol);
  }

  saveData(rol : Role) : Observable<RestResponse>{
    return this.http.post<RestResponse>(`${this.url}/role`, rol);
  }

  updateData(rol : Role) : Observable<RestResponse>{
    return this.http.put<RestResponse>(`${this.url}/role`, rol);
  }

}
