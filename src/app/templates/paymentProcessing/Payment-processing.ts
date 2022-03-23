import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UsersServiceService } from "src/app/services/users-service.service";
import { VerifyOldUserpopup } from "../VerifyOldUserPopup/VerifyOldUser-popup";

@Component({
    selector: 'Payment-processing',
    templateUrl: 'Payment-processing.html',
    styleUrls: ['Payment-processing.scss']
  })

export class Paymentprocessing {
    constructor( public dialogRef: MatDialogRef<VerifyOldUserpopup>,@Inject(MAT_DIALOG_DATA) public data: any,
            private userServ:UsersServiceService)
    {}

async DeclineUser(){
    this.dialogRef.close();
  }
}