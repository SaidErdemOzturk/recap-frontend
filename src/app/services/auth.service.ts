import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { UserService } from './user.service';
import { APIURL } from '../constants/ApiServer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private userService:UserService) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(APIURL+"login",loginModel)
  }

  
  isAuthenticated(){
    if(localStorage&&localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

}
