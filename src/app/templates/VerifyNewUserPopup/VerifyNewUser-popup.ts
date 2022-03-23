import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
    selector: 'VerifyNewUser-popup',
    templateUrl: 'VerifyNewUser-popup.html',
    styleUrls: ['VerifyNewUser-popup.scss']
  })

export class VerifyNewUserpopup {
constructor( public dialogRef: MatDialogRef<VerifyNewUserpopup>,@Inject(MAT_DIALOG_DATA) public data: any,
            private userServ:UsersServiceService)
{}

async ApproveUser(id:String){
  await this.userServ.VerifyUnverifiedUser(id);
  this.dialogRef.close();
}
async DeclineUser(){
  this.dialogRef.close();
}
  getImageURL(image:String):String{
    return ''
   //return this.userServ.getImageURL(image);
  }
}