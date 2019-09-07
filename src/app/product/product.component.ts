import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  constructor(private productService : ProductService, private activatedRoute : ActivatedRoute) { }

  products:Product[]=[];
  pageCount = new Array(1);
  pageNo = 1;
  categoryId = null;

  ngOnInit() {
    var obsComb = combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams,
      (params, qparams) => ({params, qparams}));

      obsComb.subscribe( ap => {
        if(ap.params['categoryId'] != null) this.categoryId = ap.params['categoryId'];
        if(ap.qparams['q'] != null) this.getProducts(ap.qparams['q']);
        else this.getProducts();
      });
  }

  getProducts(searchTerm?)
  {
    this.productService.getProducts(this.pageNo,this.categoryId,searchTerm).subscribe(response=>{
      this.products = response['data'];
      this.pageCount = new Array(response['last_page']);
    });
  }



}
