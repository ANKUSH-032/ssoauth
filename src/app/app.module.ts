import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { LoginComponent } from './component/login/login.component';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { Router } from '@angular/router';
import myAuthConfig from './config/my-auth-config';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth: any, injector: Injector) => {
  const router = injector.get (Router);
  router.navigate(['/login']);
  }
  }, myAuthConfig.oidc)

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
