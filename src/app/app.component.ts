import { Component, AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UsersServiceService } from './services/users-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor(private route: Router,private UserServ:UsersServiceService) {
    for (let i = 1; i <= 16; i++) {
      this.Images.push(`assets/sponsors/${i.toString()}.jpg`);
    }
    this.HandleAnims();
  }
  ngAfterViewInit(): void {
    this.InitAnims();
  }
  currentRoute = '';
  homeLink:any;
  MembershipLink:any;
  blogLink:any;
  AboutLink:any;
  title = 'YMFWeb';
  smallScreenState = false;
  IsSmallScreen = false;
  LoggedIn = false;
  Images:String[] = [];
  Year = new Date().getFullYear();
  @HostListener('window:resize', ['$event']) onResize(event:any) {
    const screenwidth = window.innerWidth;
    if (screenwidth > 780) {
      this.IsSmallScreen = false;
    } else {
      this.IsSmallScreen = true;
    }
  }
  logOut() {
    this.UserServ.LogOut();
  }
  IsLoggedIn() {
    if(this.UserServ.isAuthenticated&&this.route.url.includes('loggedIn')){
      return true;
    }
    return false;
  }
  
  getIfRole(panel:String){
    switch(panel){
      case 'mm':
        if(this.UserServ.user?.role===('board-member'|| 'admin')||
        this.UserServ.user?.extraRoles===('registra')){
          return '';
        }
        return 'hide';
      case 'f':
        if(this.UserServ.user?.role===('admin')||
        this.UserServ.user?.extraRoles===('accounting'||'registra')){
          return '';
        }
        return 'hide';
      case 'p':
        if(this.UserServ.user?.role===('admin')||
        this.UserServ.user?.extraRoles===('editor'||'IT')){
          return '';
        }
        return 'hide';
      default:
        return'';
    }
  }
  getCancelActions(thing:String):String{
    if(this.smallScreenState){
      switch(thing){
        case 'hum':
          return 'cancel'
        case 'top':
          return 'partX'
        case 'mid':
        return 'notX'
        case 'bottom':
          return 'partXrev'
      }
    }
    return '';
  }
  ToggleMenu() {
    if (this.smallScreenState == true) {
      this.smallScreenState = false;
    } else {
      this.smallScreenState = true;
    }
  }
  HandleAnims() {
    this.route.events.subscribe((value) => {
      this.smallScreenState = false;
      this.currentRoute = this.route.url;
      if (this.currentRoute === '/home' && this.homeLink) {
        this.homeLink.forEach((element:any) => {
          element.style.background = 'white';
        });
        this.MembershipLink.forEach((element:any) => {
          element.style.background = '';
        });
        this.AboutLink.forEach((element:any) => {
          element.style.background = '';
        });
        this.blogLink.forEach((element:any) => {
          element.style.background = '';
        });
      } else if (this.currentRoute.includes('/member') && this.MembershipLink) {
        this.MembershipLink.forEach((element:any) => {
          element.style.background = 'white';
        });
        this.homeLink.forEach((element:any) => {
          element.style.background = '';
        });
        this.AboutLink.forEach((element:any) => {
          element.style.background = '';
        });
        this.blogLink.forEach((element:any) => {
          element.style.background = '';
        });
      } else if (this.currentRoute === '/about' && this.AboutLink) {
        this.homeLink.forEach((element:any) => {
          element.style.background = '';
        });
        this.MembershipLink.forEach((element:any) => {
          element.style.background = '';
        });
        this.AboutLink.forEach((element:any) => {
          element.style.background = 'white';
        });
        this.blogLink.forEach((element:any) => {
          element.style.background = '';
        });
      } else if (this.currentRoute.includes('/blog') && this.blogLink) {
        this.blogLink.forEach((element:any) => {
          element.style.background = 'white';
        });
        this.homeLink.forEach((element:any) => {
          element.style.background = '';
        });
        this.AboutLink.forEach((element:any) => {
          element.style.background = '';
        });
        this.MembershipLink.forEach((element:any) => {
          element.style.background = '';
        });
      }
    });
  }

  InitAnims() {
    const screenwidth = window.innerWidth;
    if (screenwidth > 730) {
      this.IsSmallScreen = false;
      this.smallScreenState = false;
    } else {
      this.IsSmallScreen = true;
    }
    this.homeLink = window.document.querySelectorAll('.home');
    this.MembershipLink = window.document.querySelectorAll('.membership');
    this.AboutLink = window.document.querySelectorAll('.about');
    this.blogLink = window.document.querySelectorAll('.blog');

  }
}
