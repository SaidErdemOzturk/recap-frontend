import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="http://localhost:5197/api/Brands/"
  constructor(private httpClient:HttpClient) { }

  getBrands() :Observable<ListResponseModel<Brand>> {
    let newUrl=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
  }

  addBrand(brand:Brand) :Observable<ResponseModel> {
    let newUrl=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }
}