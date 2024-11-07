import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';
import { OperationClaim } from '../../models/userClaims';
import { OPERATION_CLAIMS } from '../../constants/OperationClaims';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})


export class BrandComponent implements OnInit {

  currentBrand:Brand ={brandId:0,brandName:""}
  brands:Brand[] = []
  filterText:string=""
  operationClaims: OperationClaim[]|null=[]

  

  constructor(private brandService:BrandService,
    private userService:UserService
  ) {  }
  ngOnInit(): void {
    this.getBrands();
  }

  checkClaims(){
    return this.userService.checkClaims(OPERATION_CLAIMS.ADMIN)
  }


  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands=response.data
    })
  }
  setCurrentBrand(brand:Brand){
    if(this.currentBrand==brand){
      this.currentBrand={brandId:0,brandName:""}
    }else{
      this.currentBrand=brand
    }
  }

  getCurrentBrandClass(brand:Brand){
    if(this.currentBrand==brand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  setDefaultBrandItems(){
    this.currentBrand={brandId:0,brandName:""}
  }

}
