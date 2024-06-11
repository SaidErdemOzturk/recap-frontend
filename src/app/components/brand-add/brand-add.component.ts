import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrl: './brand-add.component.css'
})
export class BrandAddComponent implements OnInit{

  brandAddFormGroup:FormGroup
  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService
  ){
  }
  ngOnInit(): void {
    this.initFormGroup()
  }

  initFormGroup(){
    this.brandAddFormGroup=this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

  add(){
    if(this.brandAddFormGroup.valid){
      let brandModel = Object.assign({}, this.brandAddFormGroup);
      this.brandService.addBrand(brandModel.value).subscribe(response => {
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
}
