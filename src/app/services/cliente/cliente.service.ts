import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  urlBase=environment.urlBase;
  
  saveOrUpdate(cliente:any){
    return this.http.post<any>(`${environment.urlBase}/cliente`, cliente);
  }

  consultaByparameter(cliente: any){//muestras que aún no han sido radicadas
    return this.http.post<any>((`${this.urlBase}/cliente/filtrar`), cliente)
  }

  changedStatus(usuario:any){
    return this.http.post<any>(`${environment.urlBase}/cliente/changed-status`, usuario);
  }
  getaAll():Observable<any>{
    return this.http.get<any>(`${environment.urlBase}/cliente`);
  }

  getaAllActive():Observable<any>{
    return this.http.get<any>(`${environment.urlBase}/cliente/active`);
  }

}
