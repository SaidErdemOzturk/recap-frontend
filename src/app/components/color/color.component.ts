import { Component, OnInit } from '@angular/core';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';
import { OperationClaim } from '../../models/userClaims';
import { OPERATION_CLAIMS } from '../../constants/OperationClaims';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrl: './color.component.css'
})
export class ColorComponent implements OnInit{

  currentColor:Color ={colorId:0,colorName:""}
  colors:Color[]=[]
  filterText=""
  operationClaims: OperationClaim[]|null=[]

  constructor(private colorService:ColorService,
    private userService:UserService
  ){}

  ngOnInit(): void {
    this.getColors();
  }

  checkClaims(){
    return this.userService.checkClaims(OPERATION_CLAIMS.ADMIN)
  }

  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors=response.data
    })
  }

  setCurrentColor(color:Color){
    this.currentColor=color
  }
  setDefaultColorItems(){
    this.currentColor={colorId:0,colorName:""}
  }

  getCurrentColorClass(color:Color){
    if(this.currentColor==color){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}
