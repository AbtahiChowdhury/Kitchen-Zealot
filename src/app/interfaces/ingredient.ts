export interface Ingredient 
{
    uid?:string;
    title: string;
    price: number;
    category?: string;
    imageUrl: string;
    orderFrequency?:number;
}
