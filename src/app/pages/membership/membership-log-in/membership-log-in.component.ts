import { User } from './../../../models/user';
import { UsersServiceService } from './../../../services/users-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-membership-log-in',
  templateUrl: './membership-log-in.component.html',
  styleUrls: ['./membership-log-in.component.scss'],
})
export class MembershipLogInComponent implements OnInit {
  constructor(private router: Router, private userServ: UsersServiceService,private fb:FormBuilder) {
    this.logInForm = fb.group({ymfid:['',Validators.required],password:['',Validators.required]});
  }
  loggingIn = false;
  logInForm:FormGroup
  ngOnInit(): void {}

  
  changePage(pg:string) {
    switch (pg) {
      case 'signup':
        this.router.navigateByUrl('/member/signUp');
        break;
      case 'reset':
        this.router.navigateByUrl('/member/reset');
        break;
    }
  }

  async LogIn(ev:MouseEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.loggingIn = true;
    await this.userServ.logIn(this.logInForm.value);
    this.loggingIn=false;
  }
}
