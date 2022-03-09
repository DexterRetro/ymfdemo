import { UsersServiceService } from './../../../services/users-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsServiceService } from 'src/app/services/events-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-membership-nav',
  templateUrl: './membership-nav.component.html',
  styleUrls: ['./membership-nav.component.scss'],
})
export class MembershipNavComponent implements OnInit {
  

  IsSmallScreen=false;
  ShowMobileNots =true;
  Calender: {
    year:String;
    yearAbbr:String;
    month:String;
    monthAbbr: String;
    weekdays: [String];
    weekdaysAbbr: [String];
    days: Number;
    firstWeekday:Number;
    lastWeekday: Number,
    calendar: [[Number]]
  }
  UserNotifications:[{NotHeader:String,NotContent:String,NotExpirery:Date}] | any;
  constructor(private router: Router, private Auth: UsersServiceService,
    private events:EventsServiceService,private matDialog:MatDialog) {
    this.Calender={year:'',
      yearAbbr:'',
      month:'',
      monthAbbr: '',
      weekdays: [''],
      weekdaysAbbr: [''],
      days: 0,
      firstWeekday:0,
      lastWeekday:0,
      calendar: [[0]]};
     
  }
  


  getIfRole(panel:String){
    switch(panel){
      case 'mm':
        if(this.Auth.user?.role==='admin'||
        this.Auth.user?.role==='board-member'||
        this.Auth.user?.extraRoles==='registra'){
          return '';
        }
        return 'hide';
      case 'f':
        if(this.Auth.user?.role===('admin')||
        this.Auth.user?.extraRoles==='accounting'||
        this.Auth.user?.extraRoles==='registra'){
          return '';
        }
        return 'hide';
      case 'p':
        if(this.Auth.user?.role===('admin')||
        this.Auth.user?.extraRoles==='editor'||
        this.Auth.user?.extraRoles==='IT'){
          return '';
        }
        return 'hide';
        default:
          return'';
    }
  }
  OpenPaymentDialog(){
    this.matDialog.open(MembersPopUpPayment);
  }
  IfHome(){
    if(window.innerWidth>780){
      return true;
    }
    return this.router.url==='/member/loggedIn/home';
  }
  ngOnInit(): void {
    this.events.getCalender().then(c=>{
      c.subscribe(ca=>{this.Calender =ca.Calender});
    })
    const screenwidth = window.innerWidth;
    if(screenwidth<780){
      this.ShowMobileNots= false;
    }
    this.UserNotifications=this.Auth.user?.Notifications;
  }

  
  showMobileNots(){
    this.ShowMobileNots = !this.ShowMobileNots;
  }
  checkCalenderDateVisibility(number:any){
    if(number<1){
      return 'hideCalenderSlot';
    }
    return '';
  }
  changePage(page:any) {
    switch (page) {
      case 'prof':
        this.router.navigateByUrl('member/loggedIn/home');
        break;
      case 'admin':
        this.router.navigateByUrl('member/loggedIn/admin');
        break;
      case 'set':
        this.router.navigateByUrl('member/loggedIn/settings');
        break;
    }
  }

  getSelectedState(pg:String) {
    switch (this.router.url) {
      case '/member/loggedIn/home':
        if (pg === 'prof') {
          return 'selected';
        } else {
          return '';
        }

      case '/member/loggedIn/admin/members':
        if (pg === 'users') {
          return 'selected';
        } else {
          return '';
        }
      case '/member/loggedIn/settings':
        if (pg === 'set') {
          return 'selected';
        } else {
          return '';
        }
      case '/member/loggedIn/admin/finance':
          if (pg === 'finance') {
            return 'selected';
          } else {
            return '';
          }
      case '/member/loggedIn/blog':
          if (pg === 'blog') {
           return 'selected';
          } else {
            return '';
          }
      case '/member/loggedIn/admin/blog':
          if (pg === 'blogeditor') {
            return 'selected';
          } else {
            return '';
          }
      default:''
      break;

    }
    return ''
  }

  logOut() {
    this.Auth.LogOut();
  }
}

@Component({
  selector: 'members-popUp-payment',
  templateUrl: './payment-popUp.html',
  styleUrls: ['./payment-popUp.scss'],
})

export class MembersPopUpPayment implements OnInit{
  paymentForm:FormGroup|any;
  processing=false;
  constructor(private fb:FormBuilder,private UserServ:UsersServiceService,public dialogRef: MatDialogRef<MembersPopUpPayment>){
    this.paymentForm=fb.group({
      payment:['',Validators.required],
      refCode:['',Validators.required],
      amount:['',Validators.required],
      purpose:['',Validators.required]
    });
  }
  ngOnInit(): void {
  }

  async uploadPaymentConfirmation(){
    this.dialogRef.disableClose = true;
    this.processing=true;
   const res=await this.UserServ.UploadProofOfPayment(this.paymentForm.value);
   res.subscribe(r=>{
    this.processing=false;
    this.dialogRef.disableClose = false;
    this.dialogRef.close();
   })
  
  }
}