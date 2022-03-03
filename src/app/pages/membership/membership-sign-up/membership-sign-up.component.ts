import { UsersServiceService } from './../../../services/users-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-membership-sign-up',
  templateUrl: './membership-sign-up.component.html',
  styleUrls: ['./membership-sign-up.component.scss'],
})
export class MembershipSignUpComponent implements OnInit {
  SigningUp = false;
  userSignUpForm:FormGroup |any;
  userRegForm:FormGroup |any;
  payNowForm:FormGroup |any;
  PayedForm:FormGroup |any;
  otherForm:FormGroup |any;
  PictureName='';
  imageSrc='';
  SelectedPayment:any;

  constructor(private router: Router, private userAuth: UsersServiceService,private fb:FormBuilder) {
    this.createForms();
  }
  provinces = [
    'Bulawayo Province',
    'Harare Province',
    'Manicaland Province',
    'Mashonaland Central Province',
    'Mashonaland East Province',
    'Mashonaland West Province',
    'Masvingo Province',
    'Matabeleland North Province',
    'Matabeleland South Province',
    'Midlands Province',
  ];
  ngOnInit(): void {  }
 // const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 // this.emailValid = regex.test(this.user.email.toString());
  changPage(pg:any) {
    switch (pg) {
      case 'login':
        this.router.navigateByUrl('/member/logIn');
        break;
    }
  }

  createForms(){
    this.userSignUpForm = this.fb.group(
      {
        firstName:['',Validators.required],
        surname:['',Validators.required],
        email:['',Validators.compose([Validators.required,Validators.email])],
        phone:['',Validators.compose([Validators.required,Validators.minLength(10)])],
        province:['',Validators.compose([Validators.required])],
        id:['',Validators.compose([Validators.required,Validators.minLength(12)])],
        password:['',Validators.compose([Validators.required,Validators.minLength(8)])],
        passwordConfirm:['',Validators.compose([Validators.required])]
      });
    this.userRegForm =this.fb.group({
      ymfid:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.compose([Validators.required,Validators.minLength(8)])],
      passwordConfirm:['',Validators.compose([Validators.required])],
      idPic:['',Validators.required],
      idPicSource:['',Validators.required]
    })
    this.payNowForm = this.fb.group({
      cart:['',Validators.required],
    })
    this.PayedForm= this.fb.group({
      payment:['',Validators.required],
      refCode:['',Validators.required]
    });
    this.otherForm= this.fb.group({
      payment:['',Validators.required],
      refCode:['',Validators.required]
    })
    
  }

  async SignUp() {
    this.SigningUp = true;
    let User ={
    userName:this.userSignUpForm.controls['firstName'].value,
    userSurname:this.userSignUpForm.controls['surname'].value,
    password:this.userSignUpForm.controls['password'].value,
    passwordConfirm:this.userSignUpForm.controls['passwordConfirm'].value,
    email:this.userSignUpForm.controls['email'].value,
    phoneNumber:this.userSignUpForm.controls['phone'].value,
    IDNumber:this.userSignUpForm.controls['id'].value,
    Province:this.userSignUpForm.controls['province'].value,
    PayNowcart:undefined,
    OtherPayments:{payment:'',refCode:''}
    };
    switch(this.SelectedPayment){
      case 'paynow':
        User.PayNowcart = this.payNowForm.controls['cart'].value
      break;
      case 'other':
        User.OtherPayments = this.otherForm.value;
        break;
      case 'payed':
        User.OtherPayments = this.PayedForm.value;
        break;
    }
    await this.userAuth.SignUp(User);
     this.SigningUp=false;
  }
  
  async Register(){
    this.SigningUp = true;
    const RegUser = {
       password:this.userRegForm.controls['password'].value,
       passwordConfirm:this.userRegForm.controls['passwordConfirm'].value,
       email:this.userRegForm.controls['email'].value,
       YMFID:this.userRegForm.controls['ymfid'].value,
       IDpic:this.userRegForm.controls['idPicSource'].value

    }
    await this.userAuth.Register(RegUser);
    this.SigningUp=false;
  }
  
  
  getFileName(){
    if(this.PictureName===''){
      return `no picture uploaded`
    }
    return this.PictureName
  }
  IdFormarter(event:any){
    let currentEnteredIdNum = this.userSignUpForm.controls['id'].value;
    if(!currentEnteredIdNum){
      return;
    }
    if(currentEnteredIdNum.length<3){
     return;
    }
    if(currentEnteredIdNum.charAt(2)!=='-'){
      currentEnteredIdNum = [currentEnteredIdNum.slice(0, 2), '-', currentEnteredIdNum.slice(2)].join('')
    }
    this.userSignUpForm.patchValue({id:currentEnteredIdNum});
  }

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.userRegForm.patchValue({
          idPicSource: reader.result 
        });
      };
      this.PictureName =file.name;
    }else{
      this.PictureName='';
    }
    
  }
   checkPasswords: ValidatorFn =  (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('passwordConfirm')?.value
    return pass === confirmPass ? null : { notSame: true }
  }
  
}
