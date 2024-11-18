import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { SignUpRequest } from '../model/sign-up-request';
import { LoginRequest } from '../model/login-request';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private baseUrl = "http://localhost:8080";
  
  private accessTokenKey="accessToken";

  constructor(private http: HttpClient,private router:Router) { }


  getToken():string | null{
    return localStorage.getItem(this.accessTokenKey);
  }
 
  
  logout(){
    localStorage.removeItem(this.accessTokenKey);
    this.router.navigate(['/login']);
  }

 
  signUp(signModal:SignUpRequest):Observable<any>{
    const signUpUrl = `${this.baseUrl}/auth/signup`;
    return this.http.post<{accessTokenKey:string}>(signUpUrl,signModal).pipe(
      tap((response) => {
        if (response && response.accessTokenKey) {
        }
      })
    )
  }

  login(loginModal: LoginRequest): Observable<any> {
    const loginUrl = `${this.baseUrl}/auth/login`;
    return this.http.post<{ name: string; email: string; accessToken: string }>(loginUrl, loginModal).pipe(
      tap((response) => {
        if (response && response.accessToken) {
          localStorage.setItem(this.accessTokenKey, response.accessToken);
          console.log('Access Token saved to localStorage:', response.accessToken);
        }
      })
    );
  }
  

  loginWithGithub(): void {
    const githubLoginUrl = `${this.baseUrl}/oauth2/authorize/github`;
    window.location.href = githubLoginUrl;
  }
  
  loginWithGoogle(): void {
    const googleLoginUrl = `${this.baseUrl}/oauth2/authorize/google`;
    window.location.href = googleLoginUrl;
  }

  

  isLoggedIn():boolean{
    const token =this.getToken();
    return !!token;

  }
}
