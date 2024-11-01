import { Component, OnInit } from '@angular/core';
import { CarDetailService } from '../../services/car-detail.service';
import { CarDetailDto } from '../../models/carDetailDto';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../../services/rental.service';
import { Rental } from '../../models/rental';
import { CarDetailWithImagesDto } from '../../models/carDetailWithImagesDto';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {
  defaultImagePath="assets/images/default.png"
  localhostImagePath="http://localhost:5197/Uploads/Images/";
  carDetail:CarDetailWithImagesDto={carId:0,brand:{brandId:0,brandName:""},color:{colorId:0,colorName:""},dailyPrice:0,images:[],description:"",modelYear:0}
  carRental:Rental
  buttonText:string
  constructor(private carDetailService:CarDetailService,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService,
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"])
      }
    })
  }

  getCarDetail(carId:number){
    this.carDetailService.getCarDetail(carId).subscribe(response=>{
      console.log(response.data)

      this.carDetail=response.data
      this.isCarRentalable()
    })
  }
  isCarRentalable(){
    this.rentalService.getRentalsByCarId(this.carDetail.carId).subscribe(response=>{
      this.carRental=response.data.filter(r=>r.returnDate==null)[0]
    })
  }

  setCarouselItemActive(index:number,item:number){
    if(index==item){
      return "carousel-item active"
    }else{
      return "carousel-item"
    }
  }
  setImage(imagePath:string){
    return this.localhostImagePath+imagePath
  }
}
