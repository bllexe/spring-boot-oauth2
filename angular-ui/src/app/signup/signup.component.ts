import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialService } from '../service/social.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SignUpRequest } from '../model/sign-up-request';
import { sign } from 'crypto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm: FormGroup;
  submitted = false;
  signUpRequest: SignUpRequest | undefined;

  constructor(private formBuilder: FormBuilder,private authService:SocialService,
    private toast:ToastrService,private router:Router
  ) {
    this.signupForm=this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(){
    return this.signupForm.controls;
  }

  signUp(){
    this.submitted = true;
    if(this.signupForm.invalid){
      return;
  }

  this.signUpRequest = {
    name: this.signupForm.value.name,
    email: this.signupForm.value.email,
    password: this.signupForm.value.password
  };

  this.authService.signUp(this.signUpRequest).subscribe(
    () => {
      this.toast.success('Registration successful');
      this.router.navigate(['/login']);
    },
    (error) => {
      this.toast.error('Registration failed');
    }
  );
  }

}
