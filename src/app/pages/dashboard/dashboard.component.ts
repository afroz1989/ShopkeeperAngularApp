import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private fbAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.fbAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
