import { Injectable } from '@angular/core';
import { Color } from '../models/color';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="http://localhost:5197/api/Colors/";
  constructor(private httpClient:HttpClient) { }

  getColors() : Observable<ListResponseModel<Color>>{
    let newUrl=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }
  addColor(color:Color):Observable<ResponseModel>{
    let newUrl=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newUrl,color)
  }
}
