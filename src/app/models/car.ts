import { Brand } from "./brand";
import { Color } from "./color";

export interface Car{
    carId:number;
    brandId:number;
    colorId:number;
    dailyPrice:number;
    description:string;
    modelYear:number;
}