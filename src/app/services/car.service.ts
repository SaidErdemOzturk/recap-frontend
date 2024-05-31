import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="http://localhost:5197/api/Cars/"
  constructor(private httpClient:HttpClient) { }
  

  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getcarswithdetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getcarswithdetailbybrandid?id="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"getcarswithdetailbycolorid?id="+colorId;
    console.log(colorId)
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
