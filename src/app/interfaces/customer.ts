import { User } from './user';
import { CartItem } from './cart-item';
import { Payment } from './payment';

export interface Customer
{
    uid:string;
    address:string;
    paymentDetails?:Payment;
    shoppingCart:CartItem[];
}
