import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Basket } from 'src/app/models/basket';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute, 
    private productService : ProductService,
    private basketService : BasketService
    ) { }

  product:Product;
  quantity:number=1;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getProductById(params['productId'])
    });
  }

  getProductById(productId) {
    this.productService.getProductById(productId).subscribe(data=>{
      this.product = data;
    });
  }

  addToBasket()
  {
    let basketItem:Basket = new Basket();
    basketItem.productId = this.product.id;
    basketItem.quantity = (this.quantity != 0 || this.quantity != null) ? this.quantity : 0;
    this.basketService.addToBasket(basketItem);
    this.quantity = 1;
  }
 

}
