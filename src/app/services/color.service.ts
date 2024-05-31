import { Injectable } from '@angular/core';
import { Color } from '../models/color';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="http://localhost:5197/api/Colors/getall";
  constructor(private httpClient:HttpClient) { }

  getColors() : Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl);
  }
}
