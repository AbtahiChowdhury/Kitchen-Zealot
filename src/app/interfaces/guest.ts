import { Payment } from './payment';

export interface Guest 
{
    uid?:string;
    name:string;
    phone:string;
    address?:string;
    paymentDetails?:Payment;
}
