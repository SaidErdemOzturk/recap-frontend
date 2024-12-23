import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';
import { BrandService } from '../../services/brand.service';
import { CarDetailDto } from '../../models/carDetailDto';
import { AuthService } from '../../services/auth.service';
import { OperationClaim } from '../../models/userClaims';
import { OPERATION_CLAIMS } from '../../constants/OperationClaims';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {
  defaultImagePath="assets/images/default.png"
  localhostImagePath="http://localhost:5197/Uploads/Images/";
  carsDto:CarDetailDto[]=[]
  allCars:CarDetailDto[]=[]
  brands:Brand[]=[]
  colors:Color[]=[]
  selectedBrand:Brand={brandName:"",brandId:0}
  selectedColor:Color={colorName:"",colorId:0}
  operationClaims: OperationClaim[]|null=[]

  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private brandService:BrandService,
    private authService:AuthService,
    private userService:UserService
  ){}
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }
      else {
        this.getCars(); 
      }
    })
    this.getColors();
    this.getBrands();
  }

  checkClaims(){
    return this.userService.checkClaims(OPERATION_CLAIMS.ADMIN)
  }

  setImage(imagePath:string){
    if(imagePath){
      return this.localhostImagePath+imagePath
    }
    else{
      return this.defaultImagePath
    }
  }

  getCars(){
    this.carService.getCarsDto().subscribe(response=>{
      this.allCars=response.data
      this.carsDto=response.data
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.carsDto=response.data;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.carsDto=response.data;
    })
  }

  listCars(brand:Brand,color:Color){
    this.carsDto=this.allCars
    this.carsDto=this.carsDto.filter(c=>c.brand.brandId==brand.brandId&&c.color.colorId==color.colorId)
  }
}
