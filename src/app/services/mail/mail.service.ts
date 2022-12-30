import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from 'src/app/interface/mail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http:HttpClient) { }

  sendMailUserRegistrer(mail: any): any{
    return this.http.post<any>(`${environment.urlBase}/mail/register-user`, mail);
  }

  sendMailUserResetPassword(mail: any): any{
    return this.http.post<any>(`${environment.urlBase}/mail/reset-password`, mail);
  }

  sendMailAnalisisBasic(mail: any): any{
    return this.http.post<any>(`${environment.urlBase}/mail/email-parametro-rechazado`, mail);
  }

  sendMailAnalisisFisicQuimicos(mail: any): any{
    return this.http.post<any>(`${environment.urlBase}/mail/email-parametro-rechazado`, mail);
  }

}
