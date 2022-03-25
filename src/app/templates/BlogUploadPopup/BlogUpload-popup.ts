import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BlogPost } from 'src/app/models/blog-post';
import { BlogService } from 'src/app/services/blog.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'BlogUpload-popup',
    templateUrl: 'BlogUpload-popup.html',
    styleUrls: ['BlogUpload-popup.scss']
  })


  export class BlogUploadPopup {

    isUpload =false;
      constructor( public dialogRef: MatDialogRef<BlogUploadPopup>,
        private BlogServe:BlogService,
         @Inject(MAT_DIALOG_DATA) public data: {blog:BlogPost},
         private _snackBar: MatSnackBar){
           if(data){
             this.isUpload=true;
           }
           this.Init();
    
    }
    async Init(){
      if(this.data){

        this.dialogRef.disableClose = true;
        const res =await this.BlogServe.UploadBlog(this.data.blog);
        res.subscribe(r=>{
          this._snackBar.open(r.message.toString(),'OK', {
            duration: 5 * 1000,
            panelClass:['main-snackbar']
          });
          this.dialogRef.close();
        })
      }
     
    }
    getHeader(){
      if(this.isUpload){
    return 'Uploading Article Please Wait...'
      }else{
    return 'Cover Image Not Uploaded'
      }
    }
    onNoClick(): void {
        this.dialogRef.close();
      }
  }