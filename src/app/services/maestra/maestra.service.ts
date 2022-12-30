import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaestraService {

  urlBase=environment.urlBase;

  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get<any>(`${this.urlBase}/tquiMaestra`);
  }

  getXId(nmmaestro:string):Observable<any>{
    return this.http.get<any>(`${this.urlBase}/tquidatamaestras/getXId/${nmmaestro}`);
  }

  getGroupXId(listMestras:any):Observable<any>{
    return this.http.post<any>(`${this.urlBase}/tquidatamaestras/getGroupXId`,listMestras);
  }
  getParametrosByAnalisis(dsmaestro:string){
    return this.http.get<any>(`${this.urlBase}/tquiMaestra/${dsmaestro}`);
  }
}
