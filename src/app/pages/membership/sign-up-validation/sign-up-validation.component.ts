import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up-validation',
  templateUrl: './sign-up-validation.component.html',
  styleUrls: ['./sign-up-validation.component.scss']
})
export class SignUpValidationComponent implements OnInit {

  PaymentUrl='';
  subscription: Subscription |any;
  attempts = 10;
  constructor(private router:Router,private auth:UsersServiceService) {
    this.PaymentUrl = this.auth.RedirectUrl;
   
    if(!this.PaymentUrl){
      this.router.navigateByUrl('/member');
      return;
    }
    if(this.PaymentUrl!=='pendingAproval'){
      const source = interval(5000);
      this.subscription = source.subscribe(val => this.pollResultSuccession());
     window.open(this.PaymentUrl,"_blank");
 
    }
  }

  ngOnInit(): void {
     
  }

  navigateToExternal(){
    window.open(this.PaymentUrl,"_blank");
  }

  async pollResultSuccession(){
    if(this.attempts<1){
      this.subscription.unsubscribe();
      return;
    }
    this.attempts=this.attempts-1;
    await this.auth.PollPayementResult();

  }
  restartCheck(){
    this.attempts=10;
    const source = interval(5000);
    this.subscription = source.subscribe(val => this.pollResultSuccession());
  }
  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
   
  }
}
