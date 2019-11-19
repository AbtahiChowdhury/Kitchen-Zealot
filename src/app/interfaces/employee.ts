import { User } from './user';

export interface Employee
{
    uid:string;
    position:string;
    salary:number;
    averageRating?:number;
}
