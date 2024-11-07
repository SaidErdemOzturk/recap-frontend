import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarDetailDto } from '../models/carDetailDto';
import { CarDetailWithImagesDto } from '../models/carDetailWithImagesDto';
import { APIURL } from '../constants/ApiServer';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  constructor(private httpClient:HttpClient) {
   }

   getCarDetail(carId:number):Observable<SingleResponseModel<CarDetailWithImagesDto>>{
    let newPath=APIURL+"getcarwithdetailbycarid?id="+carId
    return this.httpClient.get<SingleResponseModel<CarDetailWithImagesDto>>(newPath)
   }
}
