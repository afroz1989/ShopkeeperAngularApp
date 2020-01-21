import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  submitted = false;
  constructor(public authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      uid: [this.authService.userDetails.uid, Validators.required],
      email: [this.authService.userDetails.email, Validators.email],
      name: [this.authService.userDetails.displayName, Validators.required],
      mobile: ['', Validators.required],
    });
  }
  updateProfile() {
    this.submitted = true;
    console.log('Update clicked');
    if (this.profileForm.invalid) {
      return;
    }
  }

  get formValue() {
    return this.profileForm.controls;
  }

}
