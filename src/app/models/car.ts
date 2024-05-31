import { Brand } from "./brand";
import { Color } from "./color";

export interface Car{
    carId:number;
    brand:Brand;
    color:Color;
    dailyPrice:number;
    imagePath:string;
}