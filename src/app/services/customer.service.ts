import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CustomerDto } from '../models/customerDto';
import { APIURL } from '../constants/ApiServer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  getCustomersDto() : Observable<ListResponseModel<CustomerDto>>{
    return this.httpClient.get<ListResponseModel<CustomerDto>>(APIURL)
  }
}
