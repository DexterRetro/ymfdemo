import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-membership-settings',
  templateUrl: './membership-settings.component.html',
  styleUrls: ['./membership-settings.component.scss'],
})
export class MembershipSettingsComponent implements OnInit {
 
  User: any;
  UserForm:FormGroup;
  imageSrc:any;
  constructor(private router: Router, private auth: UsersServiceService,private fb:FormBuilder) {
    this.User = { ...auth.user};
    this.imageSrc=this.User?.ProfilePhoto;
    this.UserForm=fb.group({
      password:['',Validators.required],
      passwordConfirm:['',Validators.required],
      oldPassword:['',Validators.required],
      savedProfPic:['']
    })
   // this.imageSrc = auth.getImageURL(auth.user?.ProfilePhoto);
  }

  ngOnInit(): void {}
  
  onFileChange(event:any){
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.UserForm.patchValue({
          savedProfPic: reader.result 
        });
      };
    }
  }
  Submit() {
   // this.auth.ChangeUserDetails(this.user);
  }
  getProfilePic(picName:any) {
    return `${environment.backendRoot}profile/${picName}`;
  }
}
