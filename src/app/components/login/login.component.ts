import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginFormGroup:FormGroup;

  constructor(
    private authService: AuthService,
    private userService:UserService,
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
  
  login() {
    console.log("girdi");
    if (this.loginFormGroup.valid) {
      let loginModel = Object.assign({}, this.loginFormGroup.value);
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.info(response.message);
        this.userService.getUserDtoByEmail(loginModel.email).subscribe(user => {
          this.userService.getClaims(user.data.id).subscribe(claims => {
            const userInfo = { id:user.data.id, firstName: user.data.firstName, lastName: user.data.lastName };
            localStorage.setItem("operationClaims", JSON.stringify(claims.data));
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", loginModel.email);
            this.userService.updateUser(userInfo);
            
            this.router.navigate(['/']).then(() => {
              console.log("Yönlendirme tamamlandı.");
            });
          });
        });
      });
    } else {
      this.toastrService.error("Boş alanları doldurunuz");
    }
  }
}
