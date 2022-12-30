import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataMaestras } from 'src/app/interface/datamaestra';
import { Muestra } from '../../interface/muestra';

@Injectable({
  providedIn: 'root'
})
export class MuestraService {

  constructor(private http:HttpClient) { }

  urlBase=environment.urlBase;

  listaMaestra(){
    return this.http.get<DataMaestras>(`${this.urlBase}`);
  }
  insert(muestra:Muestra):Observable<any>{
    return this.http.post(`${this.urlBase}`, muestra);
  }

  countRegisterByDate(date:any):Observable<number>{
    return this.http.get<number>(`${this.urlBase}/count-register-by-date/${date}`);
  }
  consultaByparameter(muestra:Muestra){//muestras que aún no han sido radicadas
    return this.http.post<any>((`${this.urlBase}/filtrar`), muestra)
  }
  updateMuestra(muestra:any):Observable <any>{
    return this.http.put<Muestra>((`${this.urlBase}`),muestra);
  }
  deleteMuestra(cdunimuestra:string){
    return this.http.delete<any>((`${this.urlBase}/muestra/${cdunimuestra}`));
  }
  getAnalisisTerminadosBymuestra(cdunimuestra:string):Observable<any>{
    return this.http.get<any>((`${this.urlBase}/parametros-analisis/${cdunimuestra}`))
  }
  asociarAnalisisAMuestra(muestra: any){
    return this.http.put<any>((`${this.urlBase}/muestra/analisis`),muestra)
  }

  getAnalisisAsociadosMuestra(cdunimuestra:string):Observable<any>{
    return this.http.get<string>((`${this.urlBase}/parametros-analisis-asociados/${cdunimuestra}`))
  }

  updateEstadoPentAprobar(muestra: any){
    return this.http.put<any>((`${this.urlBase}/muestra/pendiente-aprobacion`), muestra)
  }
  estantesOcupados(nmdato:number){
    return this.http.get<any>((`${this.urlBase}/estantes-ocupados/${nmdato}`))
  }
  generarReporteMuestra(cdunimuestra:string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/generar-reporte-muestra-pdf/${cdunimuestra}`);
  }
}


