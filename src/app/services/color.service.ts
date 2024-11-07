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

  getColors() : Observable<ListResponseModel<Color>>{
    let newUrl=APIURL+"getall"
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }
  addColor(color:Color):Observable<ResponseModel>{
    let newUrl=APIURL+"add"
    return this.httpClient.post<ResponseModel>(newUrl,color)
  }
}
