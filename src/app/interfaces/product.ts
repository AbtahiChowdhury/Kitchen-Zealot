export interface Product 
{
    uid?:string;
    title: string;
    price: number;
    category?: string;
    imageUrl: string;
    averageRating?:number;
    orderFrequency?:number;
    addedBy?:string;
}
