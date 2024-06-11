import { Brand } from "./brand";
import { CarImage } from "./carImage";
import { Color } from "./color";

export interface CarDetailWithImagesDto{
    carId:number;
    brand:Brand;
    color:Color;
    dailyPrice:number;
    images:CarImage[];
    description:string;
    modelYear:number;
}