import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarDetailDto } from '../models/carDetailDto';
import { CarDetailWithImagesDto } from '../models/carDetailWithImagesDto';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "http://localhost:5197/api/Cars/"
  constructor(private httpClient: HttpClient) { }


  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "getcarswithdetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "getcarswithdetailbybrandid?id=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "getcarswithdetailbycolorid?id=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarDtoById(carId: number): Observable<SingleResponseModel<CarDetailWithImagesDto>> {
    let newPath = this.apiUrl + "getcarwithdetailbycarid?id=" + carId
    return this.httpClient.get<SingleResponseModel<CarDetailWithImagesDto>>(newPath)
  }

  getCarsDto(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + "getcarswithdetail"
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath)
  }

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + "getcarbyid?id=" + carId
    return this.httpClient.get<SingleResponseModel<Car>>(newPath)
  }

  updateCar(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(newPath, car)
  }

  addCar(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath, car)
  }
}
