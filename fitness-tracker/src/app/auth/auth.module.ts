import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    provideAuth(() => getAuth()),
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: []
})
export class AuthModule { }
