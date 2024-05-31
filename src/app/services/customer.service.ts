import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CustomerDto } from '../models/customerDto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl="http://localhost:5197/api/Customers/getcustomerwithdetail";

  constructor(private httpClient:HttpClient) { }

  getCustomersDto() : Observable<ListResponseModel<CustomerDto>>{
    return this.httpClient.get<ListResponseModel<CustomerDto>>(this.apiUrl)
  }
}
