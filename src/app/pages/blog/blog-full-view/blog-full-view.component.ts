import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BlogPost } from 'src/app/models/blog-post';
import { BlogService } from 'src/app/services/blog.service';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-blog-full-view',
  templateUrl: './blog-full-view.component.html',
  styleUrls: ['./blog-full-view.component.scss']
})
export class BlogFullViewComponent implements OnInit {

  blog:BlogPost={
    Author:'',
    Topic: '',
    CreatedOn:new Date,
    blogPicture:'',
    Summary: '',
    AuthorTittle:'',
    Content: [{paragraph:'',PImage:{ImbededImg:'',caption:''}}],
    Comments: [
      {
        commentor: '',
        commentedOn: '',
        Comment: '',
      }
    ],
  };
  currentURL='';
  commentForm:FormGroup |any ;
  constructor(private blogServ:BlogService,private activerouter:ActivatedRoute,
              private router:Router,private fb:FormBuilder,private datepipe: DatePipe) { 
    this.currentURL = window.location.href;
    const id = activerouter.snapshot.paramMap.get('id');
    if(!id){
      console.log('no id in Params')
      return;
    }
    blogServ.GetBlogs().then(b=>{
      b.subscribe(bl=>{
        if(!bl.Blogs||bl.Blogs.length<0){
           router.navigateByUrl('/home')
        }
        bl.Blogs.forEach(blg => {
          if(blg._id.toString()===id){
            this.blog=blg;
            return;
          }
        });
        
      })
    });
    this.createCommentForm();
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
  createCommentForm(){
     this.commentForm = this.fb.group({name:['',Validators.required],
     comment:['',Validators.required]});
  }
  getFormatedDate(date:String){
    return date.split('T')[0];
  }
  getImage(pic:any){
    return this.blogServ.getImageURL(pic);
  }
  async commentOnBlog(){
    this.blogServ.CommentOnBlog(this.blog._id,this.commentForm?.value).then(b=>{
      b.subscribe(bs=>{
        this.blog=bs.Blog;
        this.commentForm?.reset();
      }
        )
    })
  }
}
