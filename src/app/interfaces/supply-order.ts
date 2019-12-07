import { IngredientCartItem } from './ingredient-cart-item';

export interface SupplyOrder 
{
    uid?:string;
    orderedBy:string;
    orderedOn:any;
    supplyRating?:number;
    deliveredOn?:any;
    contents:IngredientCartItem[];
    status:string;
}
