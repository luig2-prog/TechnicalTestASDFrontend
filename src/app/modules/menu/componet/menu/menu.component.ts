import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthActiveGuard } from 'src/app/guards/auth-active.guard';
import jwt_decode from 'jwt-decode';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  title='PRUEBA TÉCNICA';
  mobileQuery: MediaQueryList;
  private autoLogoutSubscription: Subscription;
  isAdmin;
  userName;
  @BlockUI() blockUI: NgBlockUI | any;
  _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,    
    public route: ActivatedRoute , 
    private authService: AuthService,
    private authActiveGuard: AuthActiveGuard,
    ){
    this.mobileQuery = window.matchMedia('(max-width: 600px)');
    this.mobileQuery.addEventListener('change', () => {
      this._mobileQueryListener();
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.getPermitsAlls();
   
    const user = this.authService.getCurrentUser();
    console.log("🚀 ~ file: menu.component.ts:45 ~ MenuComponent ~ ngOnInit ~ user", user)
    
    if(user !== null) {
      this.isAdmin = user.isAdmin;
      this.userName = user.fullName;
      let myTimer = timer(2000, 5000);
      this.autoLogoutSubscription = myTimer.subscribe(() => {
        this.authActiveGuard.canActivate();
    })
    }
  }

  ngAfterViewInit(): void {
      this.changeDetectorRef.detectChanges();
  }

  getPermitsAlls() {
    const user = this.authService.getCurrentUser();
    let token = null;
    if (user) {
      token = user.token;
    }
  }
  
  logout() {
    this.blockUI.start('Saliendo...');
    this.authService.logout();
    this.blockUI.stop();
  }
}
