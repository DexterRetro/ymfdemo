import { BlogPost } from './../../models/blog-post';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AboutpageserviceService } from 'src/app/services/aboutpageservice.service';
import { NavigationEnd, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { interval, Subscription } from 'rxjs';
import { GalleryModel } from 'src/app/models/gallery';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentImageIndex = 0;
  ImagesSet:GalleryModel[]=[]
  blogs: BlogPost[] = [];
  aboutData:any;
  showLoader = true;
  ShowImage = true;
  currentTickSeconds=0;
  subscription: Subscription|any;
  constructor(
    private blog: BlogService,private aboutInfo: AboutpageserviceService,private router: Router
  ) 
  {

     blog.GetBlogs().then(b=>{
       b.subscribe(bl=>{
         this.blogs = bl.Blogs;
         this.showLoader=false;
       })
     });
     blog.GetGalleyImages().then(g=>{
       g.subscribe(gi=>{
      this.ImagesSet =this.shuffle(gi.images);
      const source = interval(1000);
      this.subscription = source.subscribe(val => this.ChangeImagesTicker());
       })
     })
  }

  ChangeImagesTicker(){
    this.currentTickSeconds++;
    if(this.ShowImage){
      if(this.currentTickSeconds>5){
        this.ShowImage=false;
        this.currentTickSeconds=0;
        this.currentImageIndex++;
        if(this.currentImageIndex>=this.ImagesSet.length){
          this.currentImageIndex=0;
        }
      }
    }else{
      if(this.currentTickSeconds>1){
        this.ShowImage=true;
        this.currentTickSeconds=0;
      }
    }
  }

  shuffle(array:any) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  ChangeImages(id:string){
    switch(id){
      case 'show':
        if(this.ShowImage){
          return ''
        }else{
          return 'hide'
        }
      case 'showout':
        if(this.ShowImage){
          return 'hide'
        }else{
          return ''
        }
      default:
        return'';
    }
  }
  getPicUrl(blogPic:String):String{
    return this.blog.getImageURLwithId(blogPic);
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
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
