import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginFormGroup:FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService,
    private router: Router

  ) { }
  

  ngOnInit(): void {
    this.initLoginFormGroup()
  }

  initLoginFormGroup(){
    this.loginFormGroup=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  
  login(){
    console.log("girdi")
    if(this.loginFormGroup.valid){
      let loginModel=Object.assign({},this.loginFormGroup.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("email",loginModel.email)
        this.router.navigate(['/'])
      })
    }else{
      this.toastrService.error("Boş alanları doldurunuz")
    }

  }
}
