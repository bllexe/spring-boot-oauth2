import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialService } from '../service/social.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router:Router,public authService:SocialService) { }


  logout(){
   this.authService.logout();
   
  }
}
