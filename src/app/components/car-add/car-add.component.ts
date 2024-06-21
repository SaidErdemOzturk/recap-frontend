import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../../services/car.service';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrl: './car-add.component.css'
})
export class CarAddComponent implements OnInit {

  carAddFormGroup: FormGroup
  brands:Brand[]=[]
  colors:Color[]=[]

  constructor(private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService) {
  }

  ngOnInit(): void {
    this.initFormGroup()
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
    })
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    })
  }
  initFormGroup() {
    this.carAddFormGroup = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required]
  });
  }

  add() {
    if (this.carAddFormGroup.valid) {
      let brandModel = Object.assign({}, this.carAddFormGroup);
      this.carService.addCar(brandModel.value).subscribe(response => {
        this.toastrService.success(response.message, "Başarılı")
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama Hatası")
          }
        }
      })
    } else {
      this.toastrService.error("Eksik bilgileri doldurunuz.", "Dikkat")
    }
  }
}
