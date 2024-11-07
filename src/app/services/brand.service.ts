import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { APIURL } from '../constants/ApiServer';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private httpClient:HttpClient) { }
  apiTopic="Brand/"

  getBrands() :Observable<ListResponseModel<Brand>> {
    let newUrl=APIURL+this.apiTopic+"getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
  }

  addBrand(brand:Brand) :Observable<ResponseModel> {
    let newUrl=APIURL+"add"
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }
}