import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error:String;
  constructor(public fbAuth: AngularFireAuth, private router: Router) { 
      this.fbAuth.authState.subscribe(auth => {
        if(auth) {
          console.log('Status', auth);
          this.router.navigateByUrl('/dashboard');
        }
      })
   }

  ngOnInit() {
  }

  googleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.fbAuth.auth.signInWithPopup(provider)
    .then(res => {
      console.log('Login success');
      this.router.navigateByUrl('/dashboard');
    })
    .catch(err => {
      console.error('Error ', err);
      this.error = err.message;
    })
  }

}
