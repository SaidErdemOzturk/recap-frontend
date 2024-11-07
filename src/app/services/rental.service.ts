import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rentalDto';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { APIURL } from '../constants/ApiServer';

@Injectable({
  providedIn: 'root'
})
export class RentalService {


  constructor(private httpClient:HttpClient) { }

  getRentalsDto():Observable<ListResponseModel<RentalDto>>{
    let newUrl=APIURL+"getrentalswithdto"
    return this.httpClient.get<ListResponseModel<RentalDto>>(APIURL);
  }
  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newUrl=APIURL+"getrentalsbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<Rental>>(newUrl)
  }
  rentalCar(rental:Rental):Observable<ResponseModel>{
    let newUrl=APIURL+"add"
    return this.httpClient.post<ResponseModel>(newUrl,rental)
  }
}
