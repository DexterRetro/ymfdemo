import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';


@Component({
  selector: 'app-membership-admin-finances',
  templateUrl: './membership-admin-finances.component.html',
  styleUrls: ['./membership-admin-finances.component.scss']
})
export class MembershipAdminFinancesComponent implements OnInit {

  constructor(private Auth:UsersServiceService,private router:Router,private dialog:MatDialog) {
    if(this.Auth.user?.role!=='admin'&&
    this.Auth.user?.extraRoles!=='accounting'||this.Auth.user?.extraRoles!=='registra'){

    }
  }

  ngOnInit(): void {
  }

  AddTransaction(){
    this.dialog.open(FinanceAddTrans);
  }

  ApproveAction(){
    this.dialog.open(FinanceAprove);
  }

  RatePopUp(){
    this.dialog.open(FinanceRate);
  }

  ServicePopup(){
    this.dialog.open(FinanceService);
  }
}


@Component({
  selector: 'finance-add-Trans',
  templateUrl: './FinanceAddTransactionPopup/financeAddTrans.html',
  styleUrls: ['./FinanceAddTransactionPopup/financeAddTrans.scss'],
})
export class FinanceAddTrans{

  TransactionAddForm:FormGroup;

  constructor(fb:FormBuilder){
   this.TransactionAddForm=fb.group(
     {
       customerName:['',Validators.required],
       date:['',Validators.required],
       refcode:['',Validators.required],
       amount:['',Validators.required],
       currency:['',Validators.required],
       purpose:['',Validators.required],
       platform:['',Validators.required]
    })
  }


}

@Component({
  selector: 'finance-aprove',
  templateUrl: './FinanceAprovePopup/financeAprove.html',
  styleUrls: ['./FinanceAprovePopup/financeAprove.scss'],
})
export class FinanceAprove{


}

@Component({
  selector: 'finance-rate',
  templateUrl: './FinanceRatePopup/financeRate.html',
  styleUrls: ['./FinanceRatePopup/financeRate.scss'],
})
export class FinanceRate{
  RateForm:FormGroup;

  constructor(fb:FormBuilder){
   this.RateForm=fb.group(
     {
       rate:['',Validators.required],
    })
  }
}


@Component({
  selector: 'finance-add-Trans',
  templateUrl: './FinanceServicePopup/financeService.html',
  styleUrls: ['./FinanceServicePopup/financeService.scss'],
})
export class FinanceService{
  MerchForm:FormGroup;
  SubsForm:FormGroup;

  constructor(private fb:FormBuilder,
    private dialogRef: MatDialogRef<FinanceService>,
    @Inject(MAT_DIALOG_DATA) public data: {merch:any,subs:any},){
   this.MerchForm=fb.group(
     {
       merch:['',Validators.required],
       price:['',Validators.required],
    });
    this.SubsForm=fb.group(
      {
        subname:['',Validators.required],
        validity:['',Validators.required],
        price:['',Validators.required]
    })
  }
}
