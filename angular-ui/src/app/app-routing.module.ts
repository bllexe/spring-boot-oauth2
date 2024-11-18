import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './security/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
 // { path: '', redirectTo: '/login', pathMatch: 'full',component:LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home',component:HomeComponent},
  { path: 'signup',component:SignupComponent},
  { path: '**', redirectTo: '/login' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
