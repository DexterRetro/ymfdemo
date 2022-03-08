import { environment } from './../../../../../environments/environment';
import { User } from './../../../../models/user';
import { UsersServiceService } from './../../../../services/users-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-membership-home',
  templateUrl: './membership-home.component.html',
  styleUrls: ['./membership-home.component.scss'],
})
export class MembershipHomeComponent implements OnInit {
  user: User|any;
  constructor(private router: Router, private auth: UsersServiceService) {
    this.user = auth.user;

  }

  ngOnInit(): void {}



  getProfilePic(picName:any) {
    return this.auth.getImageURL(picName);
  }

  getMembershipvalidity(){
    if(this.user.MembershipExpireryDate<this.user.MembershipSubscriptionDate){
      return 'Not Active';
    }else{
      return 'Active';
    }
  }
  getFormatedDate(date:String){
    return date.split('T')[0];
  }
}
