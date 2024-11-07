import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { CreditCart } from '../models/creditCart';
import { APIURL } from '../constants/ApiServer';

@Injectable({
  providedIn: 'root'
})
export class CreditCartService {


  constructor(private httpClient:HttpClient) { }

  payWithCreditCart(creditCart:CreditCart):Observable<ResponseModel>{
    let newUrl=APIURL+"paywithcreditcart"
    return this.httpClient.post<ResponseModel>(newUrl,creditCart)
  }
}
