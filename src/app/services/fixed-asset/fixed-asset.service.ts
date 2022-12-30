import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RestResponse } from 'src/app/interface/RestResponse';


@Injectable({
  providedIn: 'root'
})
export class FixedAssetService {

  constructor(private http: HttpClient) { }

  urlBase = environment.urlBase;

  list() {
    return this.http.get<any>(`${this.urlBase}/v1/fixed-asset`);
  }

  save(data: any): Observable<any> {
    return this.http.post(`${this.urlBase}/v1/fixed-asset`, data);
  }

  getByTypeDateOrSerial(data): Observable<RestResponse> {
    return this.http.post<RestResponse>(`${this.urlBase}/v1/fixed-asset/search`, data);
  }

}



