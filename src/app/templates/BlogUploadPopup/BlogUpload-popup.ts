import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'BlogUpload-popup',
    templateUrl: 'BlogUpload-popup.html',
    styleUrls: ['BlogUpload-popup.scss']
  })


  export class BlogUploadPopup {
      constructor( public dialogRef: MatDialogRef<BlogUploadPopup>){

    }

    onNoClick(): void {
        this.dialogRef.close();
      }
  }