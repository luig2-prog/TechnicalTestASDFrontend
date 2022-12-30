import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../../interface/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url:string = environment.urlBase;

  constructor(private http:HttpClient) { }

  getParametros() : Observable<any>{
    return this.http.get(`${this.url}/v1/role`);
  }

  getById(id : number) : Observable<Rol>{
    return this.http.get<Rol>(`${this.url}/role/${id}`);
  }

  updateRolEstado(rol : Rol) : Observable<Rol>{
    return this.http.put<Rol>(`${this.url}/role/estado`, rol)
  }

  saveData(rol : Rol) : Observable<Rol>{
    return this.http.post<Rol>(`${this.url}/role`, rol);
  }

  updateData(rol : Rol) : Observable<Rol>{
    return this.http.put<Rol>(`${this.url}/role`, rol)
  }

}
