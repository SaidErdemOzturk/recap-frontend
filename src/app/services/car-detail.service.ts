import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarDetailDto } from '../models/carDetailDto';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl="http://localhost:5197/api/Cars/"
  constructor(private httpClient:HttpClient) {
   }

   getCarDetail(carId:number):Observable<SingleResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl+"getcarwithdetailbycarid?id="+carId
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newPath)
   }
}
