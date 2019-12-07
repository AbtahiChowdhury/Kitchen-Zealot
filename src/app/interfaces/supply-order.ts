import { IngredientCartItem } from './ingredient-cart-item';

export interface SupplyOrder 
{
    uid?:string;
    orderedBy:string;
    orderedOn:any;
    contents:IngredientCartItem[];
}
