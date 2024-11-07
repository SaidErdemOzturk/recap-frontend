import { Injectable } from '@angular/core';
import { Color } from '../models/color';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { APIURL } from '../constants/ApiServer';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient:HttpClient) { }
  apiTopic="Colors/"

  getColors() : Observable<ListResponseModel<Color>>{
    let newUrl=APIURL+this.apiTopic+"getall"
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }
  addColor(color:Color):Observable<ResponseModel>{
    let newUrl=APIURL+this.apiTopic+"add"
    return this.httpClient.post<ResponseModel>(newUrl,color)
  }
}
