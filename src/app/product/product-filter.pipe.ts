import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
  
  constructor(private productService : ProductService) { }

  transform(value: Product[], filter: string): Observable<Product[]> {
    return this.productService.getProducts(0,filter);
  }

}
