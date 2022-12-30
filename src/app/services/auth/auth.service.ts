import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jwt } from '../../modules/login/model/jwtInterface';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private user: any = null;


  constructor(private http:HttpClient
    , @Inject('LOCALSTORAGE') private localStorage: Storage
    ) {     }

  // public nuevo(usuario:Usuario) : Observable<any>{
  //   return this.http.post<any>(this.authURL+'nuevo',usuario);
  // }

  public login(loginUsuario:any) : Observable<any>{
    return this.http.post<Jwt>(`${environment.urlBase}/v1/user/login`,loginUsuario);
  }

  public resetPassword(user:any): Observable<any>{
    return this.http.post<any>(`${environment.urlBase}/user/set-passowrd`, user)
  }

  
  setCurrentUser(token: string, setPassword: boolean) {
    
    token = token.replace('Bearer ','');
    localStorage.setItem("token", token);
    const decodedToken = jwt_decode(token);
    const decodedData = JSON.parse(decodedToken['sub']);
    console.log("🚀 ~ file: auth.service.ts ~ line 43 ~ AuthService ~ setCurrentUser ~ decodedData", decodedData)
    var date = decodedToken["exp"];
    var isAdmin = false;
    if (decodedToken["authorities"][0] == "ROLE_DIRECTOR"){
        isAdmin = true;
    }
    var currentUser = {
        token: token,
        isAdmin: isAdmin,
        email: decodedData.username,
        id: null,
        alias: decodedData["username"],
        expiration: date,
        fullName: decodedData["name"],
        roles: decodedData["role"]["name"],
        username: decodedData.username,
        setPassword: setPassword
    };
    this.user = currentUser;
    return true;
  }
  
  logout(): void {
    // clear token remove user from local storage to log user out
    this.user = null;
    localStorage.removeItem("token");
  }

  getCurrentUser(): any {
    if (this.user != null) {
        const newExpiration = moment(this.user['expiration']*1000);
        if (newExpiration.isValid()) {
            this.user['expiration'] = newExpiration;
        }
        return this.user;
    }
    return null;
}

}
