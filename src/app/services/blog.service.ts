import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../models/blog-post';
import { GalleryModel } from '../models/gallery';
import { MagazineItem } from '../models/ymfMag';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) {   }

  async GetBlogs ():Promise<Observable<{message:String,Blogs:BlogPost[]}>>{
    const Blogs = await this.http.get<{message:String,Blogs:BlogPost[]}>(`${environment.backendAPIURL}/blog`);
    return Blogs;
  }
  async AproveUnverifiedBlogs (id:any):Promise<Observable<{message:String}>>{
    const Blogs = await this.http.post<{message:String}>(`${environment.backendAPIURL}/blog/unverified`,{id:id});
    return Blogs;
  }

  getFileWithURL(imageQuery:String){
    if(!imageQuery){
      return ''
    }
    const formatedQuery = imageQuery.split('/');
    const Url = `${environment.backendAPIURL}/file?folder=${formatedQuery[0]}&filename=${formatedQuery[1]}`
    return Url;
  }


  getFileWithId(imageQuery:String){
    if(!imageQuery){
      return ''
    }
    const Url = `${environment.backendAPIURL}/file?id=${imageQuery}`
    return Url;
  }

  async GetGalleyImages():Promise<Observable<{message:String,images:GalleryModel[]}>>{
    const gallery = await this.http.get<{message:String,images:GalleryModel[]}>(`${environment.backendAPIURL}/gallery`);
    return gallery;
  }
  async UploadBlog(blog:BlogPost):Promise<Observable<{message:String,Blog:BlogPost}>>{
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };
    const Blog = await this.http.post<{message:String,Blog:BlogPost}>(`${environment.backendAPIURL}/blog`,blog,options);
    return Blog;
  }
  async UploadWordDOcument(wordDocument:any):Promise<Observable<{message:String,Blog:BlogPost}>>{
    let formData = new FormData();
    formData.append('upload', wordDocument,);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };
    const Blog = await this.http.post<{message:String,Blog:BlogPost}>(`${environment.backendAPIURL}/blog/word`,formData,options);
    return Blog;
  }

  async UpdateBlog(id:any,blog:any):Promise<Observable<{message:String,Blog:BlogPost}>>{
    const Blog = await this.http.post<{message:String,Blog:BlogPost}>(`${environment.backendAPIURL}/blog/update`,{id,blog});
    return Blog;
  }

  async CommentOnBlog(id:any,comment:any):Promise<Observable<{message:String,Blog:BlogPost}>>{
    const CommentedBlog = await await this.http.post<{message:String,Blog:BlogPost}>(`${environment.backendAPIURL}/blog/update`,{id,comment});
  return CommentedBlog;
  }

  async DeleteBlog(id:any){
    const Blog = await this.http.delete(`${environment.backendAPIURL}/blog/${id}`);
    return Blog;
  }

  async UploadMagazineDocument(MagazineDocument:any):Promise<Observable<{message:String}>>{
    let formData = new FormData();
    formData.append('upload', MagazineDocument,);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };
    const Blog = await this.http.post<{message:String}>(`${environment.backendAPIURL}/blog/magazine`,formData,options);
    return Blog;
  }
  async DeleteMagazine(id:any){
    const Blog = await this.http.delete(`${environment.backendAPIURL}/blog/magazine/${id}`);
    return Blog;
  }

  async GetMagazine ():Promise<Observable<{message:String,magazines:MagazineItem[]}>>{
    const Blogs = await this.http.get<{message:String,magazines:MagazineItem[]}>(`${environment.backendAPIURL}/blog/magazine`);
    return Blogs;
  }

  async DownloadMagazine (Url:String):Promise<Observable<{}>>{
    const Blogs = await this.http.get<{}>(Url.toString());
    return Blogs;
  }

}
