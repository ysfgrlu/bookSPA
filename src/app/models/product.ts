import { Category } from './category';
import {Deserializable} from "./deserializable";

export class Product implements Deserializable{
    id:number;
    name:string;
    categoryId:number;
    author:string;
    pageCount:number;
    content:string;
    publisher:string;
    price:number;
    imageUrl:string;
    created_at;
    updated_at;
    get_category:Category;

    deserialize(input: any): this {
        Object.assign(this, input);
       // this.get_category = input[0].get_category.map(category => new Category().deserialize(category));
        console.log(input[0].get_category);
        return this;
      }
}
