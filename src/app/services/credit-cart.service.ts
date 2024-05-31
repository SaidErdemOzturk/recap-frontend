import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { CreditCart } from '../models/creditCart';

@Injectable({
  providedIn: 'root'
})
export class CreditCartService {

  apiUrl="http://localhost:5197/api/CreditCart/";

  constructor(private httpClient:HttpClient) { }

  payWithCreditCart(creditCart:CreditCart):Observable<ResponseModel>{
    let newUrl=this.apiUrl+"paywithcreditcart"
    return this.httpClient.post<ResponseModel>(newUrl,creditCart)
  }
}
