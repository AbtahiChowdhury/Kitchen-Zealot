import { CartItem } from './cart-item';

export interface Order 
{
    uid?:string;
    orderedBy:string;
    cookedBy?:string;
    deliveredBy?:string;
    foodRating?:number;
    deliveryRating?:number;
    contents:CartItem[];
}
