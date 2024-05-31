import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {

  currentBrand:Brand ={id:0,brandName:""}
  brands:Brand[] = []
  filterText:string=""

  constructor(private brandService:BrandService) {  }
  ngOnInit(): void {
    this.getBrands();
  }


  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands=response.data
    })
  }
  setCurrentBrand(brand:Brand){
    if(this.currentBrand==brand){
      this.currentBrand={id:0,brandName:""}
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
    this.currentBrand={id:0,brandName:""}
  }

}
