import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataMaestras } from '../../interface/datamaestra';

@Injectable({
  providedIn: 'root'
})
export class DataMaestraService {

  urlBase=environment.urlBase;
  constructor(private http:HttpClient) { }

  saveUpdate(dataMaestra:DataMaestras): Observable<any>{
    return this.http.post<DataMaestras>(`${this.urlBase}/tquidatamaestras/saveUpdate`,dataMaestra);
  }
  delete(nmdato:number){
    return this.http.delete<DataMaestras>(`${this.urlBase}/tquidatamaestras/${nmdato}`);
  }
}
