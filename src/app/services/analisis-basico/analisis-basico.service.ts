import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnalisiBasicos } from '../../interface/analisisBasico';

@Injectable({
  providedIn: 'root'
})
export class AnalisisBasicoService {

  urlBase=environment.urlBase;
  constructor(private http:HttpClient) { }

  insert(form:AnalisiBasicos):Observable<any>{
    return this.http.post<any>(`${this.urlBase}/tqui-analisis-basico`,form);
  }

  getAnalisisBasicos(cdunimuestra:string, tipoanalisis:string):Observable<any>{
    return this.http.get<any>(`${this.urlBase}/tqui-analisis-basico/${cdunimuestra}/${tipoanalisis}`);
  }
  
  updateAnalisisBasico(form:any):Observable<any>{
    return this.http.put<any>(`${this.urlBase}/tqui-analisis-basico`,form);
  }
  deleteAnalisiBasico(id:string){
    return this.http.delete<any>(`${this.urlBase}/tqui-analisis-basico/${id}`);
  }
  getEquipoMEdicion(abreviatura:string){
    return this.http.get<any>(`${this.urlBase}/tquidatamaestras/equipo-medicion/${abreviatura}`);
  }
  updateEstadoPenAproCalidad(cdunianalisisbasico:string){
    return this.http.get<any>(`${this.urlBase}/tqui-analisis-basico/actualizar-estado-pendiente-calidad/${cdunianalisisbasico}`);
  }

  aprobarAnalisisCalidad(cdunianalisisbasico:string, cdunimuestra:string){
    return this.http.get<any>(`${this.urlBase}/tqui-analisis-basico/aprobar-analisis-calidad/${cdunianalisisbasico}/${cdunimuestra}`);
  }
  updateParametroRechazado(cdunianalisisbasico:string){
    return this.http.get<any>(`${this.urlBase}/tqui-analisis-basico/actualizar-estado-rechazado/${cdunianalisisbasico}`);
  }
}
