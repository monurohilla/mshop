import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {

  @Input('product') product:Product;
  @Input('show-actions') showActions=true;
 @Input('shopping-cart') shoppingCart: ShoppingCart;

    constructor(private cartService:ShoppingCartService) { }

 addToCart(){
  this.cartService.addToCart(this.product);
 }


}
