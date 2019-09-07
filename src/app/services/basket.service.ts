import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from '../models/basket';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router
  ) { }

  path = "http://localhost:8000/api/";
  TOKEN_KEY = "token";

  getBasket(): Observable<Basket[]> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.token);
    return this.httpClient.get<Basket[]>(this.path + 'basket/', { headers: headers });
  }

  dropFromBasket(basketId: number) {
    return this.httpClient.delete(this.path + "basket/" + basketId);
  }

  addToBasket(basketItem) {
    if (this.token != null) {
      let headers = new HttpHeaders();
      headers = headers.append("Authorization", "Bearer " + this.token);
      return this.httpClient.post(this.path + "basket", basketItem, { headers: headers }).subscribe(data => {
        this.alertifyService.success("Ürün başarıyla sepete eklendi");
        console.log(data);
      });
    } else {
      this.alertifyService.warning("Üye girişi yapmalısınız.");
    }
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
