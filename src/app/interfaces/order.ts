import { CartItem } from './cart-item';

export interface Order 
{
    uid?:string;
    orderedBy:string;
    orderedOn:Date;
    cookedBy?:string;
    deliveredBy?:string;
    foodRating?:number;
    deliveryRating?:number;
    customerRating?:number;
    contents:CartItem[];
    subtotal:number;
    tax:number;
    discount:number;
    total:number;
}
