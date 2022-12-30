import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestResponse } from 'src/app/interface/RestResponse';
import { User } from 'src/app/interface/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  saveOrUpdate(usuario:User){
    return this.http.post<RestResponse>(`${environment.urlBase}/v1/user`, usuario);
  }

  changedStatus(usuario:User){
    return this.http.post<RestResponse>(`${environment.urlBase}/user/changed-status`, usuario);
  }
  getaAll():Observable<RestResponse>{
    return this.http.get<RestResponse>(`${environment.urlBase}/v1/user`);
  }
  deleteUser(nmid:string){
    return this.http.delete<RestResponse>(`${environment.urlBase}/user/${nmid}`);
  }
}