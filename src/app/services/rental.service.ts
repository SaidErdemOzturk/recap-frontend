import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDto } from '../models/rentalDto';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="http://localhost:5197/api/Rentals/"

  constructor(private httpClient:HttpClient) { }

  getRentalsDto():Observable<ListResponseModel<RentalDto>>{
    let newUrl=this.apiUrl+"getrentalswithdto"
    return this.httpClient.get<ListResponseModel<RentalDto>>(this.apiUrl);
  }
  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newUrl=this.apiUrl+"getrentalsbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<Rental>>(newUrl)
  }
  rentalCar(rental:Rental):Observable<ResponseModel>{
    let newUrl=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newUrl,rental)
  }
}
