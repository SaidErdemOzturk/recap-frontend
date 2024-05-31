import { Component, OnInit } from '@angular/core';
import { Color } from '../../models/color';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrl: './color.component.css'
})
export class ColorComponent implements OnInit{

  currentColor:Color ={id:0,colorName:""}
  colors:Color[]=[]
  filterText=""

  constructor(private colorService:ColorService){}

  ngOnInit(): void {
    this.getColors();
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
    this.currentColor={id:0,colorName:""}
  }

  getCurrentColorClass(color:Color){
    if(this.currentColor==color){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
}
