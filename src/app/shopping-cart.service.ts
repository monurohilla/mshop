
import { take, map } from 'rxjs/operators';
import { Product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService 
{
     constructor(private db :AngularFireDatabase) { }

         async getCart(): Promise<Observable<ShoppingCart>>
      {
            let cartId= await this.getOrCreateCartId();
            return this.db.object('/shopping-carts/' +cartId).valueChanges()
            .pipe(map(x=> new ShoppingCart(x['items'])));
      }

      async addToCart(product:Product)
      {
          this.updateItem(product,1);
      } 

      async removeFromCart(product:Product)
       {
          this.updateItem(product,-1);
       }

       async clearCart()
       {
         let cartId = await this.getOrCreateCartId();
         this.db.object('/shopping-carts/' + cartId + '/items').remove();
       }

     private getItem(cartId:string ,productId:string)
       {
            return  this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
       }
 
     private async getOrCreateCartId(): Promise<string>
       {
            let cartId=localStorage.getItem('cartId')
            if(cartId)  return cartId;

            let result =await this.create();
            localStorage.setItem('cartId', result.key)
            return result.key
       }

       private create()
      {
          return this.db.list('/shopping-carts')
          .push({ dateCreated: new Date().getTime()})
      }

         
        private async updateItem(product:Product, change:number)
         {
            let cartId = await this.getOrCreateCartId();
            let item$= this.getItem(cartId ,product.key);
             item$.valueChanges().pipe(take(1)).subscribe(item => {
      let productQuantity = (product.quantity || 0) + change;
      let itemQuantity;
      if (item) {
        itemQuantity = item['quantity'];
        if(item['quantity'] === 0 || productQuantity === 0) {
          return item$.remove();
        }


        
        item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: itemQuantity + change });
      } 


      else {
        itemQuantity = productQuantity;
        if(productQuantity === 0 || itemQuantity === 0) {
          return item$.remove();
        }
        item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: productQuantity });
      }
    })

     
          }
 }


