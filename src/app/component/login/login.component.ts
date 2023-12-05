import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import  OktaSignIn from '@okta/okta-signin-widget';
import myAuthConfig from 'src/app/config/my-auth-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;
  constructor(private oktaAuthService: OktaAuthService) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      features: {
        registration: true
      },
      baseUrl: myAuthConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAuthConfig.oidc.clientId,
      redirectUri: myAuthConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAuthConfig.oidc.issuer,
        scopes: myAuthConfig.oidc.scopes
      }
    });
  }

  ngOnInit(): void {

    this.oktaSignin.renderEl({ el: '#okta-sign-in-widget' },
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuthService.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      });
  } 
  ngOnDestroty() : void{
    this.oktaSignin.Remove()
  }
}
    


