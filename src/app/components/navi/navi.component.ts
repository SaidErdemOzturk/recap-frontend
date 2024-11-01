import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from '../../models/userDto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent implements OnInit {

  userDto:UserDto={firstName:"",lastName:""}
  buttonTitle:string
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService,
    private userService:UserService

  ) { }

  isAuthenticated() {
    if(this.authService.isAuthenticated()){
      this.buttonTitle="Çıkış Yap"
      return true
    }else{
      this.buttonTitle="Giriş Yap"
      return false
    }
  }

  ngOnInit(): void {
    console.log(localStorage.getItem("email"))
    if(this.authService.isAuthenticated()){
      this.userService.getUserDtoByEmail(localStorage.getItem("email")!).subscribe(response=>{
        if(response.success){
          this.userDto.firstName=response.data.firstName
          this.userDto.lastName=response.data.lastName
          console.log(this.userDto)
        }
      })
    }
  }

  getUserDto(){

  }

  changeLoginButton() {
    if (this.authService.isAuthenticated()) {
      return ""
    } else {
      return ""
    }
  }

}
