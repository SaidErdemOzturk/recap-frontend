import { Brand } from "./brand";
import { CarImage } from "./carImage";
import { Color } from "./color";

export interface CarDetailDto{
    carId:number;
    brand:Brand;
    color:Color;
    dailyPrice:number;
    imagePath:string;
    description:string;
    modelYear:number;
}