import { ShoppingCartService } from './../shopping-cart.service';
import { switchMap } from 'rxjs/operators';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

products=[];
filterdProducts:Product[]=[];
category:string;
cart$:Observable<ShoppingCart>;

  constructor(
   private route:ActivatedRoute,
   private productService:ProductService,
   private shoppingCartService:ShoppingCartService,
    ) { 

    
  }
 async ngOnInit(){
 this.cart$= await this.shoppingCartService.getCart();
this.populateProduct();
}

private populateProduct() {
  this.productService
   .getAll() 
   .pipe(switchMap(products => 
  {
    this.products=products;
    return  this.route.queryParamMap;
  }))

    .subscribe(params =>{
      this.category= params.get('category');
     this.applyFilter();
          });
}
  
private applyFilter() {
  this.filterdProducts= (this.category) ?
  this.products.filter(p =>p.category === this.category):
  this.products
}
}
