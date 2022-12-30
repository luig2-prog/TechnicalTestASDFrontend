import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestResponse } from 'src/app/interface/RestResponse';
import { User } from 'src/app/interface/User';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  saveOrUpdate(usuario:any){
    return this.http.post<Usuario>(`${environment.urlBase}/v1/user`, usuario);
  }

  changedStatus(usuario:Usuario){
    return this.http.post<Usuario>(`${environment.urlBase}/user/changed-status`, usuario);
  }
  getaAll():Observable<RestResponse>{
    return this.http.get<RestResponse>(`${environment.urlBase}/v1/user`);
  }
  deleteUser(nmid:string){
    return this.http.delete<any>(`${environment.urlBase}/user/${nmid}`)
  }
}