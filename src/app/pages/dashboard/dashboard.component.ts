import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

// custom user interface
interface User {
  uid: string;
  email: string;
  displayName: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name: string;
  constructor(private fbAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) { }

  ngOnInit() {
    this.fbAuth.authState.subscribe(user => {
      if (user) {
        this.afs.doc<User>(`users/${user.uid}`).valueChanges().subscribe(res => {
          this.name = res.displayName;
        });
      }
    });
  }

  logout() {
    this.fbAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
