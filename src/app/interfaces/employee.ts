import { User } from './user';

export interface Employee extends User
{
    uid:string;
    position:string;
    salary:number;
    averageRating?:number;
}
