import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../models/userDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  apiUrl="http://localhost:5197/api/Users/"

  getUserDtoByEmail(email:string):Observable<SingleResponseModel<UserDto>>{
    return this.httpClient.get<SingleResponseModel<UserDto>>(this.apiUrl+"getuserdtobyemail?email="+email)
  }


}
