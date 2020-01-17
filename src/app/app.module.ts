import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFontAwesomeModule} from 'angular-font-awesome';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EmailLoginComponent } from './pages/email-login/email-login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { IntroComponent } from './pages/intro/intro.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmailLoginComponent,
    DashboardComponent,
    NavbarComponent,
    IntroComponent,
    AboutusComponent,
    FooterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFontAwesomeModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
