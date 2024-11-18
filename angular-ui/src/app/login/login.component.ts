import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SocialService } from '../service/social.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../model/login-request';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{

  loginForm:FormGroup;
  submitted = false
  loginRequest: LoginRequest | undefined;


  constructor(private router: Router,private authService:SocialService,
              private toast:ToastrService,private formBuilder: FormBuilder) {
    
      this.loginForm=this.formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
  }
  
  get f(){
    return this.loginForm.controls;
  }

  localLogin() {
   this.submitted = true;
   if(this.loginForm.invalid){
     return;
   }
   this.loginRequest = {
     email: this.loginForm.value.email,
     password: this.loginForm.value.password
   };
   this.authService.login(this.loginRequest).subscribe(
     () => {
       this.toast.success('Login successful');
       this.router.navigate(['/home']);
     },
     (error) => {
       this.toast.error('Email or password is incorrect');
     }
   );
  }


  gotoSignup(){
    this.router.navigate(['/signup']);
  }

   
  loginWithGithub() {
   this.authService.loginWithGithub();  
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
    
  }

  handleOAuthError(error:string,errorDescription:string):void {
    this.toast.error('Login failed');
  }

}