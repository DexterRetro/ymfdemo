import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { FinanceServices } from 'src/app/services/finance.service';
import { Item } from 'src/app/models/ItemModel';
import { Transactions } from 'src/app/models/transactions';


@Component({
  selector: 'app-membership-admin-finances',
  templateUrl: './membership-admin-finances.component.html',
  styleUrls: ['./membership-admin-finances.component.scss']
})
export class MembershipAdminFinancesComponent implements OnInit {

  rate:any =0;
  subs:Item[] =[];
  merch:Item[]=[];
  PendingTransactions:Transactions[]=[];
  CompletedTransactions:Transactions[]=[];

  constructor(private Auth:UsersServiceService,
              private router:Router,
              private dialog:MatDialog,
              private finance:FinanceServices)
  {

    if(this.Auth.user?.role!=='admin'&&
    this.Auth.user?.extraRoles!=='accounting'||this.Auth.user?.extraRoles!=='registra'){

    }
    this.Initialise();
  }

  SetColor(state:String){
    if(state==='removed'){
      return "color: rgb(121, 121, 121)";
    }
    return "color: black";
  }


  formartDate(date:Date){
    return date.toString().split('T')[0];
  }

  Initialise(){
  this.finance.GetRate().then(r=>{
    r.subscribe(rt=>{
      if(rt.rate){
        this.rate = rt.rate[0].conversionRate;
      }

    });
  this.finance.GetTransactions().then(tr=>{
    tr.subscribe(trans=>{
      if(trans.transactions){
        this.CompletedTransactions =[];
        this.PendingTransactions =[];
        trans.transactions.forEach(t=>{
          if(t.status!=='pending'){
            this.CompletedTransactions.push(t)
          }else {
            this.PendingTransactions.push(t);
          }
        })
      }
    })
  })
  this.finance.GetItems().then(it=>{
    it.subscribe(items=>{
      if(items.items){
        this.merch =[];
        this.subs =[];
        items.items.forEach(t=>{
          if(t.ItemType==='merch'){
            this.merch.push(t);
          }
          else{
            this.subs.push(t);
          }
        })
      }

    })
  })
  })
  }
  ngOnInit(): void {
  }

  CalculateZWLPrices(usd:any){
    const zwl = usd*this.rate;
    return zwl;
  }

  AddTransaction(){
    this.dialog.open(FinanceAddTrans,{disableClose: true }).afterClosed().subscribe(r=>{
      this.Initialise();
    });
  }

  ApproveAction(id:any){
    this.dialog.open(FinanceAprove,{disableClose: true,data:{id:id}}).afterClosed().subscribe(r=>{
      this.Initialise();
    });
  }

  RatePopUp(){
    this.dialog.open(FinanceRate,{data:{currentRate:this.rate,disableClose: true }}).afterClosed().subscribe(r=>{
      this.Initialise();
    });
  }

  ServicePopup(){
    this.dialog.open(FinanceService,{disableClose: true }).afterClosed().subscribe(r=>{
      this.Initialise();
    });
  }

  ManageTransaction(trans:Transactions){
    this.dialog.open(FinanceManageTrans,{data:{transaction:trans,disableClose: true }}).afterClosed().subscribe(r=>{
      this.Initialise();
    });
  }
}


@Component({
  selector: 'finance-add-Trans',
  templateUrl: './FinanceAddTransactionPopup/financeAddTrans.html',
  styleUrls: ['./FinanceAddTransactionPopup/financeAddTrans.scss'],
})
export class FinanceAddTrans{

  TransactionAddForm:FormGroup;
  loading=false;
  constructor(fb:FormBuilder,private finance:FinanceServices,private DialogRef:MatDialogRef<FinanceAddTrans>){
   this.TransactionAddForm=fb.group(
     {
       customerName:['',Validators.required],
       date:['',Validators.required],
       refcode:['',Validators.required],
       amount:['',Validators.required],
       currency:['',Validators.required],
       purpose:['',Validators.required],
       platform:['',Validators.required],
       contacts:[''],
       status:['',Validators.required]
    })
  }

  AddTransaction(){
    this.loading=true;
    const trans:Transactions ={
      customer:this.TransactionAddForm.controls['customerName'].value,
      date:new Date(this.TransactionAddForm.controls['date'].value),
      refcode:this.TransactionAddForm.controls['refcode'].value,
      amount:this.TransactionAddForm.controls['amount'].value,
      currency:this.TransactionAddForm.controls['currency'].value,
      purpose:this.TransactionAddForm.controls['purpose'].value,
      paymentPlatform:this.TransactionAddForm.controls['platform'].value,
      contacts:this.TransactionAddForm.controls['contacts'].value,
      status:this.TransactionAddForm.controls['status'].value
    }
     this.finance.AddTransaction(trans).then(promise=>{
       promise.subscribe(sub=>{
        this.loading=false;
         this.Close();
       })
     }).catch(err=>{
       this.Close();
     })
  }

  Close(){
    this.loading=false;
    this.DialogRef.close();
  }

}

@Component({
  selector: 'finance-add-Trans',
  templateUrl: './FinanceManageTransaction/financeManageTrans.html',
  styleUrls: ['./FinanceManageTransaction/financeManageTrans.scss'],
})
export class FinanceManageTrans{

  loading=false;
  constructor(@Inject(MAT_DIALOG_DATA) public data:{transaction:Transactions},
              private finance:FinanceServices,
              private dialogRef: MatDialogRef<FinanceManageTrans>,){

  }

  AprroveTrans(){
  this.loading=true;
   this.finance.ApproveTransaction(this.data.transaction._id).then(obs=>{
     obs.subscribe(res=>{
       this.loading=false;
       this.Close();
     })
   }).catch(err=>{
    this.Close();
  });
   }

   formartDate(date:Date){
     return date.toString().split('T')[0];
   }

   DeleteTransaction(){
    this.loading=true;
    this.finance.RemoveTransaction(this.data.transaction._id).then(obs=>{
      obs.subscribe(res=>{
        this.loading=false;
        this.Close();
      })
    }).catch(err=>{
      this.Close();
    });
   }

   Close(){
    this.loading=false;
  this.dialogRef.close();
   }

}

@Component({
  selector: 'finance-aprove',
  templateUrl: './FinanceAprovePopup/financeAprove.html',
  styleUrls: ['./FinanceAprovePopup/financeAprove.scss'],
})
export class FinanceAprove{

  loading=false;
constructor( @Inject(MAT_DIALOG_DATA) private data:{id:any},
            private finance:FinanceServices,
            private dialogRef:MatDialogRef<FinanceAprove>){

}

Approve(){
  this.loading=true;
  this.finance.RemoveItem(this.data.id).then(subs=>{
    subs.subscribe(res=>{
      this.loading=false;
      this.Cancel();
    })
  }).catch(err=>{
    this.Cancel();
  })
}

Cancel(){
  this.loading=false;
this.dialogRef.close();
}

}

@Component({
  selector: 'finance-rate',
  templateUrl: './FinanceRatePopup/financeRate.html',
  styleUrls: ['./FinanceRatePopup/financeRate.scss'],
})
export class FinanceRate{
  RateForm:FormGroup;
  loading=false;
  constructor(fb:FormBuilder,
    private dialogRef: MatDialogRef<FinanceRate>,
    @Inject(MAT_DIALOG_DATA) private data:{currentRate:any},
    private finance:FinanceServices){
   this.RateForm=fb.group(
     {
       currency:['ZWL',Validators.required],
       rate:[data.currentRate,Validators.required],
    })
  }

  async UpdateRate(){
   this.loading=true;
   this.finance.UpdateRate(this.RateForm.value).then(obs=>{
     obs.subscribe(res=>{
      this.CloseDialog();
      this.loading = false;
     })
   }).catch(err=>{
    this.CloseDialog();
  });
  }

  CloseDialog(){
    this.loading=false;
    this.dialogRef.close();
  }
}


@Component({
  selector: 'finance-add-Trans',
  templateUrl: './FinanceServicePopup/financeService.html',
  styleUrls: ['./FinanceServicePopup/financeService.scss'],
})
export class FinanceService{
  ItemForm:FormGroup;
  loading=false;
  constructor(private fb:FormBuilder,
    private dialogRef: MatDialogRef<FinanceService>,
    private finance:FinanceServices){
   this.ItemForm=fb.group(
     {
      ItemName:['',Validators.required],
      ItemType:['',Validators.required],
      ItemPrice:['',Validators.required],
    });
  }

  AddItem(){
    this.loading=true;
    this.finance.AddItem(this.ItemForm.value).then(promise=>{
      promise.subscribe(res=>{
        this.loading=false;
        this.Close();
      })
    }).catch(err=>{
      this.Close();
    });
  }

  Close(){
    this.loading=false;
    this.dialogRef.close();
  }
}
