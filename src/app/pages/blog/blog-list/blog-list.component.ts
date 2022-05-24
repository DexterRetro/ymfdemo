import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BlogPost } from 'src/app/models/blog-post';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  MagazineList:any;
  SelectedMag:any;
  blogs:BlogPost[]=[];
  images:[]=[];
  showLoader=true;
  NoBlogs=false;
  constructor(private blogServ:BlogService,private router:Router) { 
    this.GetBlogs();
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  
  }
  async GetBlogs(){
    const blg = await this.blogServ.GetBlogs();
    blg.subscribe(b=>{
      this.blogs = b.Blogs;
      this.showLoader =false
      if(!this.blogs||this.blogs.length<1){
        this.NoBlogs=true;
      }
    });
    
  }
  getCommentCount(index:number):Number{
    return this.blogs[index]?.Comments.length;
  }
  getImageUrl(blogPic:String){
    return this.blogServ.getImageURL(blogPic);
  }

}
