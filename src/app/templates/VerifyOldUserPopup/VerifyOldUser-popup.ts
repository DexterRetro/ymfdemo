import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UsersServiceService } from 'src/app/services/users-service.service';

@Component({
    selector: 'VerifyOldUser-popup',
    templateUrl: 'VerifyOldUser-popup.html',
    styleUrls: ['VerifyOldUser-popup.scss']
  })

export class VerifyOldUserpopup {
constructor( public dialogRef: MatDialogRef<VerifyOldUserpopup>,@Inject(MAT_DIALOG_DATA) public data: any,
            private userServ:UsersServiceService)
{}

async ApproveUser(id:String){
  await this.userServ.VerifyOldUser(id);
  this.dialogRef.close();
}
async DeclineUser(){
  this.dialogRef.close();
}
  getImageURL(image:String):String{
   //return this.userServ.getImageURL(image);
   return ''
  }
}