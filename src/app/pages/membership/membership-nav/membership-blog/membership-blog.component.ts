import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/models/blog-post';
import { BlogService } from 'src/app/services/blog.service';
import {MatDialog} from '@angular/material/dialog';
import { BlogUploadPopup } from 'src/app/templates/BlogUploadPopup/BlogUpload-popup';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-membership-blog',
  templateUrl: './membership-blog.component.html',
  styleUrls: ['./membership-blog.component.scss']
})
export class MembershipBlogComponent implements OnInit {
  blog:BlogPost|any;
  ArticleFile:any;
  loadingBlog=false;
  CoverPhotoFile:any;
  DocumentBTN='Upload Document';

  constructor(private BlogServe:BlogService,public dialog: MatDialog){}
  ngOnInit(): void {}

  async uploadBlog(event:MouseEvent){
    event.stopPropagation();
    if(!this.CoverPhotoFile){
      this.dialog.open(BlogUploadPopup);
      return;
    }
    const openedDialog = this.dialog.open(BlogUploadPopup,{data:{blog:this.blog}});
    openedDialog.afterClosed().subscribe(res=>{
      this.blog = null;
      this.DocumentBTN='Upload Document';
      this.ArticleFile=null;
      window.scrollTo(0, 0);
    })
  }
 async onFileChange(event:any){
  if (event.target?.files.length > 0) {
    const file = event.target.files[0];
    this.loadingBlog=true;
    const deconstructedWord = await this.BlogServe.UploadWordDOcument(file);
    deconstructedWord.subscribe(res=>{
      this.DocumentBTN='Change Document'
      this.blog =res.Blog;
      this.loadingBlog=false;
    })
  }
 }

 updateCaption(event:any,i:any){
   this.blog.Content[i].PImage.caption=event.target.value;
 }
 getImage(image:any){
   return image.split
 }
 async SetCoverPhoto(event:any){
  if (event.target.files.length > 0) {
    const reader = new FileReader();
    this.CoverPhotoFile = event.target.files[0];
    reader.readAsDataURL(this.CoverPhotoFile);
    reader.onload = () => {
      this.blog.blogPicture = reader.result as string;
    };
  }
 }
 ButtonCoverPhoto(){
   if(this.blog.blogPicture){
     return 'Change Cover Photo'
   }
   return 'Upload Cover Photo'
 }

 InsertPhotoBtn(i:any){
   if(this.blog.Content[i].PImage){
     return 'Change Image';
   }
   return 'Insert Image';
 }
 async ImbedImagesFn(event:any,index:any){
  if (event.target.files.length > 0) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.blog.Content[index].PImage ={ImbededImg:reader.result as string,caption:''};
    };
  }
 }
 async RemoveImagesFn(index:any){
  this.blog.Content[index].PImage.ImbededImg ='';
  this.blog.Content[index].PImage.caption ='';
 }

 docuLink(){
   return `${environment.backendRoot}documents/ARTICLE_TEMPLATE.docx`
 }




}
