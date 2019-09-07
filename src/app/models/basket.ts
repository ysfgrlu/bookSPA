import { Product } from './product';

export class Basket {
    id:number;
    productId:number;
    userId:number;
    quantity:number;
    get_product:Product[];
}
