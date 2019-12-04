import { User } from './user';
import { Ingredient } from './ingredient';
import { IngredientCartItem } from './ingredient-cart-item';

export interface Employee
{
    uid:string;
    position:string;
    salary:number;
    averageRating?:number;
    warningCount?:number;
    dropCount?:number;
    active:boolean;
    supplyCart?:IngredientCartItem[];
}
