import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UnverifiedBlog } from 'src/app/models/unverifiedBlog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-membership-admin-blog',
  templateUrl: './membership-admin-blog.component.html',
  styleUrls: ['./membership-admin-blog.component.scss']
})
export class MembershipAdminBlogComponent implements OnInit {
  loading = true;
  Headers: string[] = ['Author', 'Title', 'Upload Date',];
  dataSource: MatTableDataSource<UnverifiedBlog> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  constructor(private blog:BlogService,private dialog:MatDialog){}
  ngOnInit(): void {}
  async ngAfterViewInit() {
    const UnverifiedBlogs = await this.blog.GetUnverifiedBlogs();
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

  viewUnverifiedBlog(id:any){
    const blog = this.dataSource.data.find((e:UnverifiedBlog)=>{
      return e._id===id;
    });
    if(!blog){return;}
    const paras:String[] =[];
    blog.Content.forEach((e:any)=>{
      paras.push(`$<p>{e.paragraph}</p>`);
    })
    blog.formatedParas = paras.join('')
    this.dialog.open(Articleviewpopup,{data:blog});

  }

}

@Component({
  selector: 'article-view-popup',
  templateUrl: 'article-view-popup.html',
})
export class Articleviewpopup {
constructor( public dialogRef: MatDialogRef<UnverifiedBlog>,@Inject(MAT_DIALOG_DATA) public data: any,
            private blogServ:BlogService)
{}
async ApproveUser(id:String){
  await this.blogServ.AproveUnverifiedBlogs(id);
  this.dialogRef.close();
}
async DeclineUser(){
  this.dialogRef.close();
}

}
