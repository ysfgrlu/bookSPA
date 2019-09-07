import { Component, OnInit } from '@angular/core';
import { Basket } from '../models/basket';
import { BasketService } from '../services/basket.service';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(
    private basketService: BasketService,
    private alertifyService: AlertifyService,
    private authService: AuthService
    ) { }

  basketItems: Basket[];
  totalPrice: number;
  ngOnInit() {
    this.getBasketItems();
  }

  getBasketItems() {
    this.basketService.getBasket().subscribe(data => {
      this.basketItems = data;
      this.totalPrice = this.getTotalPrice();
    });
    
  }

  deleteFromBasket(basketId: number) // todo sayfa yenilenmeden liste yenilenecek
  {
    if (window.confirm("Ürünü sepetten silmek istediğinizden emin misiniz?")) {
      this.basketService.dropFromBasket(basketId).subscribe(data => {
        this.alertifyService.warning("Ürün sepetten silindi");
        this.getBasketItems();
      });
     
    }
  }

  getTotalPrice() {
    let totalPrice=0;
    this.basketItems.forEach(function(item){
      totalPrice += (item.get_product['price'] * item.quantity);
    });
    return totalPrice;
  }

  get isLogged(){
    return this.authService.loggedIn();
  }

}
