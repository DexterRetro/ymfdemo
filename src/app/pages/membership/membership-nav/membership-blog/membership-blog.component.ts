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

  
  ImbededImages:[{Image:String,ImageFile:any,index:Number}]=[{Image:'',ImageFile:undefined,index:-1}];
  Captions:[String] =[''];
  blog:BlogPost|any;
  ArticleFile:any;
  loadingBlog=false;
  CoverPhoto:any;
  CoverPhotoFile:any;
  DocumentBTN='Upload Document';

  constructor(private BlogServe:BlogService,public dialog: MatDialog){}
  ngOnInit(): void {}

  async uploadBlog(event:MouseEvent){
    event.stopPropagation();
    if(!this.CoverPhoto){
      this.dialog.open(BlogUploadPopup);
      return;
    }
 
    const res =await this.BlogServe.UploadBlog(this.blog,this.CoverPhoto,this.ImbededImages,this.Captions);
    res.subscribe(r=>{
      
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
      for (let index = 0; index < this.blog.Content.length; index++) {
        this.ImbededImages[index] ={Image:'',ImageFile:undefined,index:index}
        this.Captions[index]='';
      }
    })
  }
 }

 updateCaption(event:any,i:any){
   this.Captions[i]=event.target.value;
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
      this.CoverPhoto = reader.result as string;
    };
  }
 }
 ButtonCoverPhoto(){
   if(this.CoverPhoto){
     return 'Change Cover Photo'
   }
   return 'Upload Cover Photo'
 }

 InsertPhotoBtn(i:any){
   if(this.ImbededImages[i]){
     return 'Change Image';
   }
   return 'Insert Image';
 }
 async ImbedImagesFn(event:any,index:any){
  if (event.target.files.length > 0) {
    const reader = new FileReader();
    this.ImbededImages[index].ImageFile = event.target.files[0];
    reader.readAsDataURL(this.ImbededImages[index].ImageFile);
    reader.onload = () => {
      this.ImbededImages[index].Image = reader.result as string;
    };
  }
 }

 docuLink(){
   return `${environment.backendRoot}documents/ARTICLE_TEMPLATE.docx`
 }




}
