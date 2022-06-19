import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BlogPost } from 'src/app/models/blog-post';
import { MagazineItem } from 'src/app/models/ymfMag';
import { BlogService } from 'src/app/services/blog.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-membership-admin-blog',
  templateUrl: './membership-admin-blog.component.html',
  styleUrls: ['./membership-admin-blog.component.scss']
})
export class MembershipAdminBlogComponent implements OnInit {

  loading = true;
  Uploading=false;
  Headers: string[] = ['Author', 'Title', 'Upload Date','Status',];
  dataSource: MatTableDataSource<BlogPost> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  magazines:MagazineItem[]=[];

  constructor(private blog:BlogService,private dialog:MatDialog){
    blog.GetMagazine().then(res=>{
      res.subscribe(mag=>{
        console.log(mag);
       this.magazines=mag.magazines;
      })
    })
  }
  ngOnInit(): void {}
  async ngAfterViewInit() {
    const UnverifiedBlogs = await this.blog.GetBlogs();
    UnverifiedBlogs.subscribe(response=>{
      this.dataSource = new MatTableDataSource(response.Blogs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading=false;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 async onFileChange(event:any){
  if (event.target?.files.length > 0) {
    const file = event.target.files[0];
    this.Uploading=true;
    const deconstructedWord = await this.blog.UploadMagazineDocument(file);
    deconstructedWord.subscribe(res=>{
      this.Uploading=false;
      this.blog.GetMagazine().then(res=>{
        res.subscribe(mag=>{
         this.magazines=mag.magazines;
        })
      })
    })
  }
 }

  deleteMag(id:any){
    this.blog.DeleteMagazine(id).then(r=>{
      r.subscribe(res=>{
      })
    })
  }
  getFormatedDate(date:string):String{
    return date.split('T')[0];
  }
  viewUnverifiedBlog(id:any){
    const blog = this.dataSource.data.find((e:BlogPost)=>{
      return e._id===id;
    });
    if(!blog){return;}
    this.dialog.open(Articleviewpopup,{data:blog}).afterClosed().subscribe(async()=>{
      this.loading=true;
      const UnverifiedBlogs = await this.blog.GetBlogs();
      UnverifiedBlogs.subscribe(response=>{
      this.dataSource.data = response.Blogs;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading=false;
    });
    });

  }

}

@Component({
  selector: 'article-view-popup',
  templateUrl: './article-view-popup.html',
  styleUrls: ['./article-view-popup.scss'],
})
export class Articleviewpopup {

processing=false;
constructor( public dialogRef: MatDialogRef<BlogPost>,@Inject(MAT_DIALOG_DATA) public data: any,
            private blogServ:BlogService,private Auth:UsersServiceService,private router:Router)
{
  if(this.Auth.user?.role!==('admin')&&
        this.Auth.user?.extraRoles!==('editor'||'IT')){
          this.router.navigateByUrl('/member');
          return;
        }
}
async ApproveUser(id:String){
  this.processing=true;
  await this.blogServ.AproveUnverifiedBlogs(id).then(ap=>{
    ap.subscribe(res=>{
      this.dialogRef.close();
      this.processing=false;
    })
  });
}
async DeclineUser(id:String){
  this.processing=true;
  await this.blogServ.DeleteBlog(id).then(ap=>{
    ap.subscribe(res=>{
      this.dialogRef.close();
      this.processing=false;
    })
  });
}
getImage(pic:any){
  return this.blogServ.getFileWithURL(pic);
}



}
