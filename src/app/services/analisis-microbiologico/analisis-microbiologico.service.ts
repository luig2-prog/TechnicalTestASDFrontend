import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalisisMicrobiologicoService {

  urlBase=environment.urlBase;

  constructor(private http:HttpClient) { }

  insert(form:any):Observable<any>{
    return this.http.post<any>(`${this.urlBase}tqui-analisis-micro-Biologico`,form);
  }

  getAnalisisMicroBiologico(cdunimuestra:string, tipoanalisis:string):Observable<any>{
    return this.http.get<any>(`${this.urlBase}tqui-analisis-micro-Biologico/${cdunimuestra}/${tipoanalisis}`);
  }
  
  updateAnalisisMicroBiologico(form:any):Observable<any>{
    return this.http.put<any>(`${this.urlBase}tqui-analisis-micro-Biologico`,form);
  }

  getEquipoMEdicion(abreviatura:string){
    return this.http.get<any>(`${this.urlBase}tquidatamaestras/equipo-medicion/${abreviatura}`);
  }

  deleteAnalisMicroBiologico(id:string){
    return this.http.delete<any>(`${this.urlBase}tqui-analisis-micro-Biologico/${id}`);
  }

}
