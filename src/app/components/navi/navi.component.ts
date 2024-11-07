import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from '../../models/userDto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  userDto: UserDto = { id: 0, firstName: '', lastName: '' };
  buttonTitle: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private cdr: ChangeDetectorRef // ChangeDetectorRef'i ekliyoruz
  ) {}

  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.buttonTitle = 'Çıkış Yap';
      return true;
    } else {
      this.buttonTitle = 'Giriş Yap';
      return false;
    }
  }
  logout(){
    this.userService.logout()
  }

  ngOnInit(): void {
    console.log('buraya 1. giriş');
    if (localStorage) {
      // localStorage'den firstName ve lastName'i al
      this.userService.currentUser.subscribe((user) => {
        this.userDto.firstName = user.firstName?user.firstName:localStorage.getItem("firstName")!;
        this.userDto.lastName = user.lastName?user.lastName:localStorage.getItem("lastName")!;
      });
      console.log('2');
    }
  }
}
