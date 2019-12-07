import { IngredientCartItem } from './ingredient-cart-item';

export interface SupplyRequest
{
    uid?:string;
    requestedBy:string;
    requestedOn:any;
    supplyRating?:number;
    completedBy?:string;
    contents:IngredientCartItem[];
    status:string;
}