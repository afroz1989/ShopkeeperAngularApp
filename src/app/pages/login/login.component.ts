import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';

// custom user interface
interface User {
  uid: string;
  email: string;
  displayName: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;
  constructor(public fbAuth: AngularFireAuth, private router: Router, private fs: AngularFirestore, private authService: AuthService) {
    this.fbAuth.authState.subscribe(auth => {
      if (auth) {
        console.log('Status', auth);
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  ngOnInit() {
  }

  googleLogin() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('profile');
    // provider.addScope('email');
    // this.fbAuth.auth.signInWithPopup(provider)
    // .then(user => {
    //   console.log('Login success');
    //   const userRef: AngularFirestoreDocument<User> = this.fs.doc(`users/${user.user.uid}`);
    //   const data: User = {
    //     uid: user.user.uid,
    //     email: user.user.email || null,
    //     displayName: user.user.displayName
    //   };
    //   userRef.set(data).then(user => {
    //     this.router.navigateByUrl('/dashboard');
    //   });
    // })
    // .catch(err => {
    //   console.error('Error ', err);
    //   this.error = err.message;
    // });
    this.authService.signInWithGoogle()
      .then(user => {
        this.router.navigateByUrl('/dashboard');
      })
      .catch(err => {
        console.error('Error ', err);
        this.error = err.message;
      });
  }

}
