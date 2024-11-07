import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { APIURL } from '../constants/ApiServer';

@Injectable({
  providedIn: 'root'
})
export class CarImageService   {
  private selectedImageSource = new BehaviorSubject<CarImage>({carId:0,date:new Date(),id:0,imagePath:""});
  selectedImage$ = this.selectedImageSource.asObservable();
  imageSelector:CarImage
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<CarImage>>{
    let newUrl=APIURL+"getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl)
  }
  getById(imageId:number):Observable<SingleResponseModel<CarImage>>{
    let newUrl=APIURL+"getbyid?id="+imageId
    return this.httpClient.get<SingleResponseModel<CarImage>>(newUrl)
  }
  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newUrl=APIURL+"getimagesbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl)
  }
  deleteImage(carImage:CarImage):Observable<ResponseModel>{
    let newUrl=APIURL+"delete"
    return this.httpClient.post<ResponseModel>(newUrl,carImage)
  }
  addImage(formFile:File,carImage:CarImage):Observable<ResponseModel>{
    const formData: FormData = new FormData();
    formData.append('formFile', formFile, formFile.name);
    formData.append('carImage', JSON.stringify(carImage));
    console.log(formData)
    let newUrl=APIURL+"add"
    return this.httpClient.post<ResponseModel>(newUrl,formData)
  }
  updateImage(formFile:File,carImage:CarImage):Observable<ResponseModel>{
    const formData: FormData = new FormData();
    formData.append('formFile', formFile, formFile.name);
    formData.append('carImage', JSON.stringify(carImage));
    console.log(formData)
    let newUrl=APIURL+"update"
    return this.httpClient.post<ResponseModel>(newUrl,formData)
  }
  selectImage(image: CarImage) {
    console.log(image)
    this.imageSelector=image
    this.selectedImageSource.next(image);
  }
  getSelectImage(){
    return this.imageSelector
  }

}
