import { Ingredient } from './ingredient';

export interface IngredientCartItem 
{
    ingredient:Ingredient;
    quantity:number;
    requestedQuantity?:number;
    uid?:string;
}
