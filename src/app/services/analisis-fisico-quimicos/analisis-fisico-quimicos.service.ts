import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalisisFisicoQuimicosService {

  urlBase=environment.urlBase;

  constructor(private http:HttpClient) { }

  insert(form:any):Observable<any>{
    return this.http.post<any>(`${this.urlBase}/tqui-analisis-fisico-quimico`,form);
  }

  getAnalisisFisicoQuimicos(cdunimuestra:string, tipoanalisis:string):Observable<any>{
    return this.http.get<any>(`${this.urlBase}/tqui-analisis-fisico-quimico/${cdunimuestra}/${tipoanalisis}`);
  }
  
  updateAnalisisFisicoQuimicos(form:any):Observable<any>{
    return this.http.put<any>(`${this.urlBase}/tqui-analisis-fisico-quimico`,form);
  }

  getParametrosByAnalisis(cdmaestro:string){
    return this.http.get<any>(`${this.urlBase}/tqui-parametros-analisis-fisico-quimico/${cdmaestro}`);
  }

  deleteAnalisFisicoQuimicos(id:string){
    return this.http.delete<any>(`${this.urlBase}/tqui-analisis-fisico-quimico/${id}`);
  }

  updateEstadoPenAproCalidad(cdunianalisifisicoquimico:string){
    return this.http.get<any>(`${this.urlBase}/tqui-analisis-fisico-quimico/actualizar-estado-pendiente-calidad/${cdunianalisifisicoquimico}`);
  }
  aprobarAnalisisCalidad(cdunianalisifisicoquimico:string, cdunimuestra:string){
    return this.http.get<any>(`${this.urlBase}/tqui-analisis-fisico-quimico/aprobar-analisis-calidad/${cdunianalisifisicoquimico}/${cdunimuestra}`);
  }
  updateParametroRechazado(cdunianalisisbasico:string){
    return this.http.get<any>(`${this.urlBase}/tqui-analisis-fisico-quimico/actualizar-estado-rechazado/${cdunianalisisbasico}`);
  }
}
