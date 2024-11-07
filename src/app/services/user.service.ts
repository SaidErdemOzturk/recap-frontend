import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../models/singleResponseModel';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../models/userDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/userClaims';
import { OPERATION_CLAIMS } from '../constants/OperationClaims';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource = new BehaviorSubject<{ firstName: string, lastName: string }>({ firstName: '', lastName: '' }); 
  operationClaims: OperationClaim[]|null=[]
  currentUser = this.userSource.asObservable();
  constructor(private httpClient:HttpClient) {
   }
  apiUrl="http://localhost:5197/api/Users/"

  logout(){
    localStorage.clear()
  }
  checkClaims(claim: { id: number; name: string }){
    if(localStorage){
      this.operationClaims=JSON.parse(localStorage.getItem('operationClaims')!)
    }
    console.log("Claims : ",this.operationClaims?.find(element => element.id == claim.id))
      return this.operationClaims?.find(element => element.id == claim.id)
  }

  updateUser(user: { id:number, firstName: string, lastName: string }) {
    localStorage.setItem("id", user.id.toString()); 
    localStorage.setItem("firstName", user.firstName); 
    localStorage.setItem("lastName", user.lastName);
     this.userSource.next(user);
  }

  getUserDtoByEmail(email:string):Observable<SingleResponseModel<UserDto>>{
    return this.httpClient.get<SingleResponseModel<UserDto>>(this.apiUrl+"getuserdtobyemail?email="+email)
  }

  
  getClaims(id:number):Observable<ListResponseModel<OperationClaim>>{
    return this.httpClient.get<ListResponseModel<OperationClaim>>(this.apiUrl+"getclaims?id="+id)
  }


}
