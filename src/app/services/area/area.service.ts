import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RestResponse } from 'src/app/interface/RestResponse';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }

  urlBase = environment.urlBase;

  list(): Observable<RestResponse> {
    return this.http.get<RestResponse>(`${this.urlBase}/v1/area`);
  }

  save(data: any): Observable<any> {
    return this.http.post(`${this.urlBase}/v1/fixed-asset`, data);
  }

}