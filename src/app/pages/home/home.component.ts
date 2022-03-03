import { BlogPost } from './../../models/blog-post';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AboutpageserviceService } from 'src/app/services/aboutpageservice.service';
import { NavigationEnd, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  pics:any;
  logo:any;
  header:any;
  shadow:any;
  content:any;
  section:any;
  opacity:any;
  newsPic:any;
  currentNewsIndex = 0;
  blogs: BlogPost[] = [];
  currentNews = 0;
  aboutData:any;
  showLoader = true;
  constructor(
    private blog: BlogService,private aboutInfo: AboutpageserviceService,private router: Router
  ) {
     blog.GetBlogs().then(b=>{
       b.subscribe(bl=>{
         this.blogs = bl.Blogs;
         this.showLoader=false;
       })
     })
  }
  getImageUrl(blogPic:String):String{
    return this.blog.getImageURL(blogPic);
  }
  
  getCommentCount(index:number):Number{
    return this.blogs[index]?.Comments.length;
  }
  ngOnInit(): void {
    this.aboutData = this.aboutInfo.getAbout();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
  ngAfterViewInit(): void {
    this.pics = window.document.querySelectorAll('.translate');
    this.logo = window.document.querySelector('.YMFLOGO');
    this.header = window.document.querySelector('header');
    this.shadow = window.document.querySelector('.shadowScrow');
    this.content = window.document.querySelector('.content');
    this.section = window.document.querySelector('section');
    this.opacity = window.document.querySelectorAll('.opc');
    this.newsPic = window.document.querySelectorAll('zoomImg');

    window.addEventListener('scroll', () => {
      let scroll = window.pageYOffset;
      let height = this.header.offsetHeight;
      let SecHeight = this.section.offsetHeight;
      let SecHeightY = this.section.getBoundingClientRect();
      this.pics.forEach((element:any) => {
        let speed = element.dataset.speed;
        element.style.opacity = -scroll * speed;
      });
      this.logo.style.opacity = -scroll / (height / 2) + 1;
      this.shadow.style.height = `${scroll * 0.5 + 300}px`;
      this.opacity.forEach((element:any) => {
        element.style.opacity = scroll / (SecHeightY.top + SecHeight);
      });
    });
  }
  getDay(date:any) {
    const dy = date.split(' ');
    return dy[0];
  }
  getMonth(date:any) {
    const dy = date.split(' ');
    return dy[1];
  }
  aboutFullView(Header:String){
    this.router.navigateByUrl('about/'+Header);
  }
}
