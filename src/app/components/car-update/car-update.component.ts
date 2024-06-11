import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../models/car';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColorService } from '../../services/color.service';
import { BrandService } from '../../services/brand.service';
import { CarDetailDto } from '../../models/carDetailDto';
import { CarDetailWithImagesDto } from '../../models/carDetailWithImagesDto';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from '../../services/car-image.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrl: './car-update.component.css'
})
export class CarUpdateComponent implements OnInit {

  car: Car
  carDetail: CarDetailWithImagesDto
  carUpdateFormGroup: FormGroup
  brands: Brand[] = []
  colors: Color[] = []

  images: any[] | undefined;
    
  responsiveOptions: any[] | undefined;


  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService:ToastrService,
    private carImageService:CarImageService
  ) {}

  ngOnInit(): void {
    this.initFormGroup()
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetail(params["carId"])
        this.getCarImages(params["carId"])
      }
    })
    this.getBrands()
    this.getColors()
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  }

  initFormGroup() {
    this.carUpdateFormGroup = this.formBuilder.group({
      carId: ["", Validators.required],
      brand: this.formBuilder.group({
        brandId: ["", Validators.required],
        brandName: ["", Validators.required]
      }),
      color: this.formBuilder.group({
        colorId: ["", Validators.required],
        colorName: ["", Validators.required]
      }),
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      images: ["", Validators.nullValidator]
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data
    })
  }
  /*
    getCar(carId:number){
      this.carService.getCarDtoById(carId).subscribe(response=>{
        this.carDetail=response.data
        //this.initFormGroup()
      })
    }*/

  getCarDetail(carId: number) {
    this.carService.getCarDtoById(carId).subscribe(response => {
      this.carDetail = response.data
      this.carUpdateFormGroup.patchValue(this.carDetail);
    })
  }

  getCarImages(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe(response=>{
      const images=this.carUpdateFormGroup.get("images")
      if(images){
      images.setValue(response.data)
      console.log("veriler eklendi")
      console.log(response.data)
      }
    })
  }

  updateCar() {
    if (this.carUpdateFormGroup.valid) {
      this.carService.updateCar({
        brandId: this.carUpdateFormGroup.get("brand.brandId")?.value,
        carId: this.carDetail.carId,
        colorId: this.carUpdateFormGroup.get("color.colorId")?.value,
        dailyPrice: this.carUpdateFormGroup.get("dailyPrice")?.value,
        description: this.carUpdateFormGroup.get("description")?.value,
        modelYear: this.carUpdateFormGroup.get("modelYear")?.value
      }).subscribe(response=>{
        this.toastrService.success(response.message)
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Dikkat")            
          }
        }
      })
      
    }
    else{
      this.toastrService.error("Eksik bilgileri doldurunuz","Dikkat")
    }
        //this.carService.updateCar(this.carDetail)
  }

}
