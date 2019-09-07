import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router
  ) { }
  path = "http://localhost:8000/api/";
  endPath;

  getProducts(pageNo?, categoryId?, filterText?): Observable<Product[]> {
    if (categoryId != null && categoryId != 0) {
      this.endPath = this.path + 'productsByCategory/' + categoryId;
    }
    else {
      this.endPath = this.path + 'products';
    }
    if(pageNo != null) {
      this.endPath += '?page='+pageNo;
    }
    if (filterText != null) {
      this.endPath += '&q=' + filterText;
    }
    console.log(this.endPath);
    return this.httpClient.get<Product[]>(this.endPath);
  }

  getProductById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(this.path + 'products/' + productId);
  }

  addProduct(product) {
    this.httpClient.post(this.path + 'products', product).subscribe(data => {
      this.alertifyService.success("Yeni ürün eklendi");
    });
  }

  updateProduct(productId: number, product) {
    this.httpClient.put(this.path + 'products/' + productId, product).subscribe(data => {
      this.alertifyService.success("Ürün başarıyla güncellendi");
      this.router.navigateByUrl("/productList");
    });
  }
}
