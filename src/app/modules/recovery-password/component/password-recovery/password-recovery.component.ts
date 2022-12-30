import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { reseatPassword } from 'src/app/interface/reset-password.Interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/JWT/token/token.service';
import { SweetAlert } from 'src/app/utils/sweetAlert.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  formReseatPassword = new FormGroup({
    passowrd:new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required)
  });
  username: string;

  @BlockUI() blockUI: NgBlockUI | any;

  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private router: Router,
    private sweetAlert: SweetAlert
    ) { }  


  
  ngOnInit(): void {
    console.log("Asi");
    
    console.log(this.authService.getCurrentUser().username);
    this.username = this.authService.getCurrentUser().username;
  }


  reseat() {
    console.log(this.formReseatPassword.value)
    console.log(this.generateObject());
    const data = {
      username: this.username,
      password: this.formReseatPassword.value.passowrd,
      reseatPassword: this.formReseatPassword.value.repeatPassword
    };
    console.log("🚀 ~ file: password-recovery.component.ts ~ line 48 ~ PasswordRecoveryComponent ~ reseat ~ data", data)
    this.authService.resetPassword(data).subscribe(response => {
      if(response.status === 200) {
        this.authService.setCurrentUser(localStorage.getItem('token'), false); 
        this.router.navigate(['/home']);
      }
    });
  }

  getValue(value:string){
    return this.formReseatPassword.get(value);
  }

  generateObject() {
    return {
      username: this.username,
      password: this.formReseatPassword.get('password')?.value,
      reseatPassword: this.formReseatPassword.get('reseatPassword')?.value
    };
  }



}
