import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user';
import { UnverifiedUser } from '../models/unverifiedUser';
import { Injectable } from '@angular/core';
import { OldUsers } from '../models/OldUsers';
@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  constructor(private http: HttpClient, private router: Router) {}
  isAuthenticated = false;
  user: User |undefined;
  unverifiedUser:any;
  RedirectUrl:any;
  getToken() {
    return localStorage.getItem('AuthToken');
  }
  async GetAllUsers():Promise<Observable<{message:String,Users:User[]}>>{
    return await this.http.get<{message:String,Users:User[]}>(`${environment.backendAPIURL}/user`);

  }
  async DeleteUnverifiedUser(id:any):Promise<Observable<{message:String}>>{
    return await this.http.delete<{message:String}>(`${environment.backendAPIURL}/newusers/${id}`);
  }
  async VerifyUnverifiedUser(id:any):Promise<Observable<{message:String}>>{
    return await this.http.post<{message:String}>(`${environment.backendAPIURL}/newusers`,{id:id});
  }
  async GetUnverifiedUsers():Promise<Observable<{message:String,Users:UnverifiedUser[]}>>{
    return await this.http.get<{message:String,Users:UnverifiedUser[]}>(`${environment.backendAPIURL}/newusers`);
  }
  async GetTransUsers():Promise<Observable<{message:String,Users:OldUsers[]}>>{
    return await this.http.get<{message:String,Users:OldUsers[]}>(`${environment.backendAPIURL}/oldusers`);
  }
  async VerifyOldUser(id:any):Promise<Observable<{message:String}>>{
    return await this.http.post<{message:String}>(`${environment.backendAPIURL}/oldusers`,{id:id});
  }
  async SignUp(user:{
    userName:String,
    userSurname:String,
    password:String,
    passwordConfirm:String,
    email:String,
    phoneNumber:String,
    IDNumber:String,
    Province:String,
    PayNowcart?:String,
    OtherPayments?:{payment:String,refCode:String}
    }): Promise<Observable<{message?:String,User:any,PaymentUrl:String}>> {
    const Response = await this.http.post<{
      PaymentUrl: String;
      User:any;
      message?: String;
    }>(`${environment.backendAPIURL}/signup`, user);
    Response.subscribe((res) => {
      if (res) {
        this.unverifiedUser = res.User;
        this.RedirectUrl = res.PaymentUrl;
        this.router.navigateByUrl(`/member/validation`);
      }
    });
    return Response;
  }

  async Register(newUser:any): Promise<Observable<{message?:String}>> {
    const Response = await this.http.post<{
      message?: String;
    }>(`${environment.backendAPIURL}/register`, newUser);
    Response.subscribe((res) => {
      if (res) {
        this.RedirectUrl = 'pendingAproval';
        this.router.navigateByUrl(`/member/validation`);
      }
    });
    return Response;
  }
  getImageURL(imageQuery:String){
    if(!imageQuery){
      return ''
    }
    const formatedQuery = imageQuery.split('/')
    const Url = `${environment.backendAPIURL}/file?folder=${formatedQuery[0]}&filename=${formatedQuery[1]}`
    return Url;
  }
  
  async logIn(loginform:any):
    Promise<Observable<{message: String;token: String;User: User;}>>
    {
    const Response =
     await this.http.post<{message: String;token: String;User: User;}>
     (`${environment.backendAPIURL}/logIn`, loginform);
     Response.subscribe(resObj=>{
      if (resObj.message.toLowerCase().includes('successful')) {
        this.isAuthenticated = true;
        this.user = resObj.User;
        localStorage.setItem('AuthToken', resObj.token.toString());
        this.router.navigateByUrl('/member');
      }
    });
    return Response;
  }

  async logInWithToken():
    Promise<Observable<{message: String;user: User;}>>
    {
    const Response =
     await this.http.get<{message: String;user: User;}>
     (`${environment.backendAPIURL}/logIn`);
     Response.subscribe(resObj=>{
      if (resObj.message.toLowerCase().includes('successful')) {
 
        this.isAuthenticated = true;
        this.user = resObj.user;
        this.router.navigateByUrl('/member/loggedIn/home');
      }else{
        this.router.navigateByUrl('/member/logIn');
        localStorage.removeItem('AuthToken');
        this.user = undefined;
        this.isAuthenticated = false;
      }
    });
    return Response;
  }


  async PaySub():Promise<Observable<{message:String,RedrirectUrl:String}>>{
    const Result = await this.http.post<{message:String,RedrirectUrl:String}>(`${environment.backendAPIURL}/pay`,this.user?._id);
    return Result;
  }

  
  async UploadProofOfPayment(payment:any):Promise<Observable<{message:String}>>{
    const Result = await this.http.post<{message:String}>(`${environment.backendAPIURL}/paymentConfirm`,payment);
    return Result;
  }

  async PollPayementResult():Promise<Observable<{message:String;PollResult:{status:String;success:Boolean;hasRedirect:Boolean},token:String}>>{
    const Result =
      await this.http.post<{message:String;PollResult:{status:String;success:Boolean;hasRedirect:Boolean},token:String;user:User}>
      (`${environment.backendAPIURL}/pollpayement`,{user:this.unverifiedUser});
    Result.subscribe(res=>{
      console.log('finished LogIn',res);
      if(res.PollResult.status==='paid'||res.PollResult.status==='awaiting delivery'){
          localStorage.setItem('AuthToken', res.token.toString());
          this.user = res.user;
          this.isAuthenticated = true;
          this.router.navigateByUrl('/member');
      }
    })
    return Result;

  }
  async LogOut() {
    await localStorage.removeItem('AuthToken');
    this.user = undefined;
    this.isAuthenticated = false;
    this.router.navigateByUrl('/home');
  }
}
