import { Injectable } from '@angular/core';

const TOKEN_KEY = 'authToken';
const USER_NAME_KEY = 'authUserName';
const AUTORITIES_KEY = 'authAutorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles : Array<string> = [];

  constructor() { }

  public setToken(token:string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(){
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserName(userName:string){
    window.sessionStorage.removeItem(USER_NAME_KEY);
    window.sessionStorage.setItem(USER_NAME_KEY, userName);
  }

  public getUserName(){
    return sessionStorage.getItem(USER_NAME_KEY);
  }

  public setAuthorities(autorities:string[]){
    window.sessionStorage.removeItem(AUTORITIES_KEY);
    window.sessionStorage.setItem(AUTORITIES_KEY, JSON.stringify(autorities));
  }

  public getAuthorities(){
    this.roles=[];
    if(sessionStorage.getItem(AUTORITIES_KEY)){
      JSON.parse(sessionStorage.getItem(AUTORITIES_KEY) || '{}').array.forEach((element: any)=> {
        this.roles.push(element.authority);
      });
    }
    return this.roles;
  }
  
  public loguot():void{
    window.sessionStorage.clear();
  }
}
