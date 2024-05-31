import { CarImage } from "./carImage";

export interface CarDetailDto{
    carId:number;
    brandName:string;
    colorName:string;
    dailyPrice:number;
    images:CarImage[];
}