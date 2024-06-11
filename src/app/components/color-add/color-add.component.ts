import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorService } from '../../services/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrl: './color-add.component.css'
})
export class ColorAddComponent implements OnInit {

  colorAddFormGroup:FormGroup
  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService
  ){
  }

  initFormGroup(){
    this.colorAddFormGroup=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  add(){
    if(this.colorAddFormGroup.valid){
      let colorModel = Object.assign({}, this.colorAddFormGroup);
      this.colorService.addColor(colorModel.value).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
      }, responseError => {
        if(responseError.error.Errors.length>0){
          console.log(responseError.error)
          for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
      })
    } else {
      this.toastrService.error("Eksik bilgileri doldurunuz.", "Dikkat")
    }
  }


  ngOnInit(): void {
    this.initFormGroup()
  }

}
