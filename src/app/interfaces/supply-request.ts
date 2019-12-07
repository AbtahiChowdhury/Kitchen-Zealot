import { IngredientCartItem } from './ingredient-cart-item';

export interface SupplyRequest
{
    uid?:string;
    requestedBy:string;
    requestedOn:any;
    supplyRating?:number;
    deliveredOn?:any;
    contents:IngredientCartItem[];
    status:string;
}