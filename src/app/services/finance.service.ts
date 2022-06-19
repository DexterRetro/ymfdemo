import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/ItemModel';
import { Transactions } from '../models/transactions';

@Injectable({
  providedIn: 'root'
})
export class FinanceServices {

  constructor(private http:HttpClient) { }

  async GetTransactions():Promise<Observable<{message:String,transactions:Transactions[]}>>{
    return await this.http.get<{message:String,transactions:Transactions[]}>(`${environment.backendAPIURL}/finance/transactions`);
  }

  async AddTransaction(transaction:Transactions):Promise<Observable<{message:String}>>{
    return await this.http.post<{message:String}>(`${environment.backendAPIURL}/finance/transactions`,{transaction})
  }

  async RemoveTransaction(transactionId:String):Promise<Observable<{message:String}>>{
    return await this.http.delete<{message:String}>(`${environment.backendAPIURL}/finance/transactions/${transactionId}`);
  }

  async ApproveTransaction(transactionId:String):Promise<Observable<{message:String}>>{
    return await this.http.patch<{message:String}>(`${environment.backendAPIURL}/finance/transactions/${transactionId}`,{});
  }

  async GetRate():Promise<Observable<{message:String,rate:{currency:String,conversionRate:Number}[]}>>{
    return await this.http.get<{message:String,rate:{currency:String,conversionRate:Number}[]}>(`${environment.backendAPIURL}/finance/rate`);
  }

  async UpdateRate(rate:{currency:String,conversionRate:Number}):Promise<Observable<{message:String}>>{
    return await this.http.post<{message:String}>(`${environment.backendAPIURL}/finance/rate`,rate);
  }

  async GetItems():Promise<Observable<{message:String,items:Item[]}>>{
    return await this.http.get<{message:String,items:Item[]}>(`${environment.backendAPIURL}/finance/items`);

  }

  async AddItem(Item:Item):Promise<Observable<{message:String}>>{
    return await this.http.post<{message:String}>(`${environment.backendAPIURL}/finance/items`,{Item});

  }

  async RemoveItem(ItemID:String):Promise<Observable<{message:String}>>{
    return await this.http.delete<{message:String}>(`${environment.backendAPIURL}/finance/item/${ItemID}`);
  }

  async UpdateItem(ItemID:String,Item:Item):Promise<Observable<{message:String}>>{
    return await this.http.put<{message:String}>(`${environment.backendAPIURL}/finance/item/${ItemID}`,{item:Item});
  }
}
