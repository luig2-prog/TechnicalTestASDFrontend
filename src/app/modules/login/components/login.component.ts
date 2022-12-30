import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth/auth.service';
import { TokenService } from '../../../services/JWT/token/token.service';
import { login } from '../model/loginInterface';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SweetAlert } from 'src/app/utils/sweetAlert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title: string = 'Login';
  isLogged=false;
  isLoginFail=false;
  nombreUsuario: string = '';
  password: string = '';
  roles:string[] = [];
  forgoutPasswordshow: boolean = false;

  @BlockUI() blockUI: NgBlockUI | any;

  formLogin: FormGroup = new FormGroup({
    nombreUsuario:new FormControl('', Validators.required),
    password:new FormControl('')
  });

  formForgoutPassword: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private router: Router,
    private sweetAlert: SweetAlert
    ) { }

  ngOnInit(): void {
    const token = localStorage.getItem("token");
    if(token != null){
        this.authService.setCurrentUser(token, false); 
        this.router.navigate(['/home']);
    }
  }

  getValue(value:string){
    return this.formLogin.get(value);
  }

  getValueEmail(value:string){
    return this.formForgoutPassword.get(value);
  }

  generateObject():login{
    return {
      usernameOrEmail: this.formLogin.get('nombreUsuario')?.value,
      password: this.formLogin.get('password')?.value
    };
  }

  onLogin():void{

    this.authService.login(this.generateObject()).subscribe(response => {
        if(response.status === 200) {
          this.blockUI.start('Cargando...');
          this.isLogged = true;
          this.isLoginFail =false;

          this.authService.setCurrentUser(response.data.tokenDeAcceso, response.data.redirectToSetPassowrd);

          this.tokenService.setToken(response.data.tokenDeAcceso);
          this.router.navigate(['/home']);
          this.blockUI.stop();
        } else {
          this.sweetAlert.warning(response.message, "Login");
        }
      }, response => {
        this.isLogged=false;
        this.isLoginFail=true;
        Swal.fire('ERROR', response.error.message, 'warning');
        this.blockUI.stop();
      });
  }

  forgoutPassword() {
    this.forgoutPasswordshow = true;
    this.title = 'Recuperar contraseña';
  }

  sendMailUser() {

    

  }

}
