"use strict";(self.webpackChunkpro_grado=self.webpackChunkpro_grado||[]).push([[773],{2773:(J,m,n)=>{n.r(m),n.d(m,{LoginModule:()=>q});var d=n(8583),a=n(3679),c=n(6187),g=n(4655),u=n(4762),p=n(8259),f=n.n(p),x=n(4741),e=n(7716),h=n(6705),_=n(1228),b=n(3147),w=n(8295);function y(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1," Solo se permiten 100 caracteres "),e.qZA())}function v(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1," Este campo es requerido "),e.qZA())}function C(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e.YNc(1,y,2,0,"div",11),e.YNc(2,v,2,0,"div",11),e.qZA()),2&t){const r=e.oxw(2);e.xp6(1),e.Q6J("ngIf",null==r.getValue("nombreUsuario").errors?null:r.getValue("nombreUsuario").errors.maxlength),e.xp6(1),e.Q6J("ngIf",null==r.getValue("nombreUsuario").errors?null:r.getValue("nombreUsuario").errors.required)}}function k(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1," Solo se permiten 100 caracteres "),e.qZA())}function Z(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1," Este campo es requerido "),e.qZA())}function T(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e.YNc(1,k,2,0,"div",11),e.YNc(2,Z,2,0,"div",11),e.qZA()),2&t){const r=e.oxw(2);e.xp6(1),e.Q6J("ngIf",null==r.getValue("password").errors?null:r.getValue("password").errors.maxlength),e.xp6(1),e.Q6J("ngIf",null==r.getValue("password").errors?null:r.getValue("password").errors.required)}}function P(t,o){if(1&t){const r=e.EpF();e.TgZ(0,"form",8),e.NdJ("ngSubmit",function(){return e.CHM(r),e.oxw().onLogin()}),e.TgZ(1,"div"),e.TgZ(2,"label",9),e._uU(3,"Usermame"),e.qZA(),e._UZ(4,"input",10),e.YNc(5,C,3,2,"mat-error",11),e.qZA(),e.TgZ(6,"div"),e.TgZ(7,"label",12),e._uU(8,"Password"),e.qZA(),e._UZ(9,"input",13),e.YNc(10,T,3,2,"mat-error",11),e.qZA(),e.TgZ(11,"div",14),e.TgZ(12,"a",15),e.NdJ("click",function(){return e.CHM(r),e.oxw().forgoutPassword()}),e._uU(13," \xbfOlvidaste tu contrase\xf1a? "),e.qZA(),e.qZA(),e.TgZ(14,"button",16),e._uU(15," Iniciar sesi\xf3n "),e.qZA(),e.qZA()}if(2&t){const r=e.oxw();e.Q6J("formGroup",r.formLogin),e.xp6(5),e.Q6J("ngIf",r.getValue("nombreUsuario").errors&&(r.getValue("nombreUsuario").touched||r.getValue("nombreUsuario").dirty)),e.xp6(5),e.Q6J("ngIf",r.getValue("password").errors&&(r.getValue("password").touched||r.getValue("password").dirty)),e.xp6(4),e.Q6J("disabled",r.formLogin.invalid)}}function M(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1," Solo se permiten 100 caracteres "),e.qZA())}function L(t,o){1&t&&(e.TgZ(0,"div"),e._uU(1," Este campo es requerido "),e.qZA())}function O(t,o){if(1&t&&(e.TgZ(0,"mat-error"),e.YNc(1,M,2,0,"div",11),e.YNc(2,L,2,0,"div",11),e.qZA()),2&t){const r=e.oxw(2);e.xp6(1),e.Q6J("ngIf",null==r.getValueEmail("email").errors?null:r.getValueEmail("email").errors.maxlength),e.xp6(1),e.Q6J("ngIf",null==r.getValueEmail("email").errors?null:r.getValueEmail("email").errors.required)}}function U(t,o){if(1&t){const r=e.EpF();e.TgZ(0,"form",8),e.NdJ("ngSubmit",function(){return e.CHM(r),e.oxw().sendMailUser()}),e.TgZ(1,"div"),e._UZ(2,"input",17),e.YNc(3,O,3,2,"mat-error",11),e.qZA(),e.TgZ(4,"button",16),e._uU(5," Enviar "),e.qZA(),e.qZA()}if(2&t){const r=e.oxw();e.Q6J("formGroup",r.formForgoutPassword),e.xp6(3),e.Q6J("ngIf",r.getValueEmail("email").errors&&(r.getValueEmail("email").touched||r.getValueEmail("email").dirty)),e.xp6(1),e.Q6J("disabled",r.formForgoutPassword.invalid)}}class i{constructor(o,r,s,l){this.tokenService=o,this.authService=r,this.router=s,this.sweetAlert=l,this.title="Login",this.isLogged=!1,this.isLoginFail=!1,this.nombreUsuario="",this.password="",this.roles=[],this.forgoutPasswordshow=!1,this.formLogin=new a.cw({nombreUsuario:new a.NI("",a.kI.required),password:new a.NI("")}),this.formForgoutPassword=new a.cw({email:new a.NI("",a.kI.required)})}ngOnInit(){const o=localStorage.getItem("token");null!=o&&(this.authService.setCurrentUser(o,!1),this.router.navigate(["/home"]))}getValue(o){return this.formLogin.get(o)}getValueEmail(o){return this.formForgoutPassword.get(o)}generateObject(){return{usernameOrEmail:this.formLogin.get("nombreUsuario")?.value,password:this.formLogin.get("password")?.value}}onLogin(){this.authService.login(this.generateObject()).subscribe(o=>{200===o.status?(this.blockUI.start("Cargando..."),this.isLogged=!0,this.isLoginFail=!1,this.authService.setCurrentUser(o.data.tokenDeAcceso,o.data.redirectToSetPassowrd),this.tokenService.setToken(o.data.tokenDeAcceso),this.router.navigate(o.data.redirectToSetPassowrd?["/user/set-passowrd"]:["/home"]),this.blockUI.stop()):this.sweetAlert.warning(o.message,"Login")},()=>{this.isLogged=!1,this.isLoginFail=!0,f().fire("ERROR","Error general","error"),this.blockUI.stop()})}forgoutPassword(){console.log("ok"),this.forgoutPasswordshow=!0,this.title="Recuperar contrase\xf1a"}sendMailUser(){}}i.\u0275fac=function(o){return new(o||i)(e.Y36(h.B),e.Y36(_.e),e.Y36(g.F0),e.Y36(b.o))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-login"]],decls:10,vars:3,consts:[[1,"bg-gray-50","dark:bg-gray-900"],[1,"flex","flex-col","items-center","justify-center","px-6","py-8","mx-auto","md:h-screen","lg:py-0"],["href","#/login",1,"flex","items-center","mb-6","text-2xl","font-semibold","text-gray-900","dark:text-white"],["src","../../../../assets/image/Escudo_Universidad.png","alt","logo",1,"logo-unicor-login"],[1,"w-full","bg-white","rounded-lg","shadow","dark:border","md:mt-0","sm:max-w-md","xl:p-0","dark:bg-gray-800","dark:border-gray-700"],[1,"p-6","space-y-4","md:space-y-6","sm:p-8"],[1,"text-xl","font-bold","leading-tight","tracking-tight","text-gray-900","md:text-2xl","dark:text-white"],["class","space-y-4 md:space-y-6",3,"formGroup","ngSubmit",4,"ngIf"],[1,"space-y-4","md:space-y-6",3,"formGroup","ngSubmit"],["for","email",1,"block","mb-2","text-sm","font-medium","text-gray-900","dark:text-white"],["formControlName","nombreUsuario","required","","type","email","name","email","id","email","placeholder","username",1,"bg-gray-50","border","border-gray-300","text-gray-900","sm:text-sm","rounded-lg","focus:ring-primary-600","focus:border-primary-600","block","w-full","p-2.5","dark:bg-gray-700","dark:border-gray-600","dark:placeholder-gray-400","dark:text-white","dark:focus:ring-blue-500","dark:focus:border-blue-500"],[4,"ngIf"],["for","password",1,"block","mb-2","text-sm","font-medium","text-gray-900","dark:text-white"],["formControlName","password","type","password","name","password","id","password","placeholder","\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022","required","",1,"bg-gray-50","border","border-gray-300","text-gray-900","sm:text-sm","rounded-lg","focus:ring-primary-600","focus:border-primary-600","block","w-full","p-2.5","dark:bg-gray-700","dark:border-gray-600","dark:placeholder-gray-400","dark:text-white","dark:focus:ring-blue-500","dark:focus:border-blue-500"],[1,"flex","items-center","justify-between"],["href","#",1,"text-sm","font-medium","text-primary-600","hover:underline","dark:text-primary-500",3,"click"],["type","submit",1,"w-full","text-white","bg-primary-600","hover:bg-primary-700","focus:ring-4","focus:outline-none","focus:ring-primary-300","font-medium","rounded-lg","text-sm","px-5","py-2.5","text-center","dark:bg-primary-600","dark:hover:bg-primary-700","dark:focus:ring-primary-800",3,"disabled"],["formControlName","email","required","","type","email","name","email","id","email","placeholder","Email",1,"bg-gray-50","border","border-gray-300","text-gray-900","sm:text-sm","rounded-lg","focus:ring-primary-600","focus:border-primary-600","block","w-full","p-2.5","dark:bg-gray-700","dark:border-gray-600","dark:placeholder-gray-400","dark:text-white","dark:focus:ring-blue-500","dark:focus:border-blue-500"]],template:function(o,r){1&o&&(e.TgZ(0,"section",0),e.TgZ(1,"div",1),e.TgZ(2,"a",2),e._UZ(3,"img",3),e.qZA(),e.TgZ(4,"div",4),e.TgZ(5,"div",5),e.TgZ(6,"h1",6),e._uU(7),e.qZA(),e.YNc(8,P,16,4,"form",7),e.YNc(9,U,6,3,"form",7),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&o&&(e.xp6(7),e.hij(" ",r.title," "),e.xp6(1),e.Q6J("ngIf",!r.forgoutPasswordshow),e.xp6(1),e.Q6J("ngIf",r.forgoutPasswordshow))},directives:[d.O5,a._Y,a.JL,a.sg,a.Fj,a.JJ,a.u,a.Q7,w.TO],styles:['.container[_ngcontent-%COMP%]{margin:auto;width:30%}.full-witdh[_ngcontent-%COMP%]{width:100%}.logo-unicor-login[_ngcontent-%COMP%]{width:100%;height:9rem}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%}body[_ngcontent-%COMP%]{margin:0;min-height:100vh;background:#e2e2e2}.app-header[_ngcontent-%COMP%]{justify-content:space-between;position:fixed;top:0;left:0;right:0;z-index:2;box-shadow:0 3px 5px -1px #0003,0 6px 10px #00000024,0 1px 18px #0000001f}.login-wrapper[_ngcontent-%COMP%]{height:100%}.positronx[_ngcontent-%COMP%]{text-decoration:none;color:#fff}.box[_ngcontent-%COMP%]{position:relative;top:0;opacity:1;float:left;padding:60px 50px 40px;width:100%;background:#fff;border-radius:10px;transform:scale(1);-webkit-transform:scale(1);-ms-transform:scale(1);z-index:5;max-width:330px}.box.back[_ngcontent-%COMP%]{transform:scale(.95);-webkit-transform:scale(.95);-ms-transform:scale(.95);top:-20px;opacity:.8;z-index:-1}.box[_ngcontent-%COMP%]:before{content:"";width:100%;height:30px;border-radius:10px;position:absolute;top:-10px;background:rgba(255,255,255,.6);left:0;transform:scale(.95);-webkit-transform:scale(.95);-ms-transform:scale(.95);z-index:-1}.login-wrapper[_ngcontent-%COMP%]   .example-form[_ngcontent-%COMP%]{min-width:100%;max-width:300px;width:100%}.login-wrapper[_ngcontent-%COMP%]   .example-full-width[_ngcontent-%COMP%], .login-wrapper[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%]{width:100%}.login-wrapper[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{text-align:center;width:100%;display:block;font-weight:700}.login-wrapper[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]{font-size:30px;margin:0}.login-wrapper[_ngcontent-%COMP%]   .mat-card[_ngcontent-%COMP%]{padding:40px 70px 50px}.login-wrapper[_ngcontent-%COMP%]   .mat-stroked-button[_ngcontent-%COMP%]{border:1px solid currentColor;line-height:54px;background:#FFF7FA}.login-wrapper[_ngcontent-%COMP%]   .mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-form-field-infix[_ngcontent-%COMP%]{padding:.8375em 0}']}),(0,u.gn)([(0,x.bH)()],i.prototype,"blockUI",void 0);const A=[{path:"",component:i}];let I=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[g.Bz.forChild(A)],g.Bz]}),t})(),q=(()=>{class t{}return t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[d.ez,c.q,a.UX,I]]}),t})()}}]);