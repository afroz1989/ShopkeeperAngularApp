import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name: string;
  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
    // if (this.authService.userDetails) {
    //   this.name = this.authService.userDetails.displayName;
    // }
  }

  logout() {
    this.authService.logout()
    .then(res => {
      this.router.navigateByUrl('/login');
    });
  }

}
