import { Component, OnInit } from '@angular/core';

import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-auth-log-in',
  templateUrl: './auth-log-in.component.html',
  styleUrls: ['./auth-log-in.component.scss']
})
export class AuthLogInComponent implements OnInit {

  constructor(private Auth:UsersServiceService) { }

  ngOnInit(): void {
    this.Auth.logInWithToken();
  }

}
