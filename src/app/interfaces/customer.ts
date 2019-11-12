import { User } from './user';
import { CartItem } from './cart-item';

export interface Customer extends User
{
    uid?:string;
    address:string;
    cardNumber?:string;
    CVV?:number;
    expirationDate?:string;
    nameOnCard?:string;
    shoppingCart:CartItem[];
}
