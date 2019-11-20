import { User } from './user';
import { CartItem } from './cart-item';

export interface Customer
{
    uid:string;
    address:string;
    cardNumber?:string;
    CVV?:number;
    expirationDate?:Date;
    nameOnCard?:string;
    shoppingCart:CartItem[];
}
