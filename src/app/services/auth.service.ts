import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppUser } from '../models/user-model';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  // public userDetails: firebase.User = null;
  public userDetails: AppUser;
  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore) {
    this.user = fireAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.fireStore.doc<AppUser>(`users/${user.uid}`).valueChanges().subscribe(res => {
          this.userDetails = { uid: user.uid, email: user.email, displayName: res.displayName, emailVerified: user.emailVerified };
          console.log('User details', this.userDetails);
        });
      } else {
        this.userDetails = null;
      }
    });
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithPopup(provider)
        .then(user => {
          console.log('Login success');
          const userRef: AngularFirestoreDocument<AppUser> = this.fireStore.doc(`users/${user.user.uid}`);
          const data: AppUser = {
            uid: user.user.uid,
            email: user.user.email || null,
            displayName: user.user.displayName,
            emailVerified: user.user.emailVerified
          };
          userRef.set(data).then(res => {
            resolve(res);
          });
        })
        .catch(err => {
          console.error('Error ', err);
          reject(err);
        });
    });
  }

  signInWithEmail(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  signupNewUser(newUser: AppUser, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(newUser.email, password)
        .then(user => {
          console.log('Success', user);
          const userRef: AngularFirestoreDocument<AppUser> = this.fireStore.doc(`users/${user.user.uid}`);
          const data: AppUser = {
            uid: user.user.uid,
            email: user.user.email,
            displayName: newUser.displayName,
            emailVerified: user.user.emailVerified
          };
          userRef.set(data).then(res => {
            resolve(res);
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  isLoggedIn(): boolean {
    if (this.userDetails) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signOut()
        .then(res => {
          console.log('Logout....');
          resolve(res);
        })
        .catch(err => {
          console.error('Error in logout');
          reject(err);
        });
    });
  }

}
