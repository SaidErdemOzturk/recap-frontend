import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl="http://localhost:5197/api/CarImages/"
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<CarImage>>{
    let newUrl=this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl)
  }
  getById(imageId:number):Observable<SingleResponseModel<CarImage>>{
    let newUrl=this.apiUrl+"getbyid?id="+imageId
    return this.httpClient.get<SingleResponseModel<CarImage>>(newUrl)
  }
  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newUrl=this.apiUrl+"getimagesbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl)
  }
  deleteImage(carImage:CarImage):Observable<ResponseModel>{
    let newUrl=this.apiUrl+"delete"
    return this.httpClient.post<ResponseModel>(newUrl,carImage)
  }
  addImage(carImage:CarImage):Observable<ResponseModel>{
    let newUrl=this.apiUrl+"add"
    return this.httpClient.post<ResponseModel>(newUrl,carImage)
  }
}
