import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { Order } from './models/order';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase,private shoppingCartService:ShoppingCartService) { }
  
  getOrders() {
    return this.db.list('/orders')
    .snapshotChanges()
    .pipe(map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val() as Order}))
    }));
  }

  getSingleOrder(id) {
    return this.db.object('/orders/' + id).valueChanges();
  }
  async placeOrder(order){
   let result= await this.db.list('/orders').push(order);
   this.shoppingCartService.clearCart();
   return result;
  }

  getOrdersByUser(userId: string) {
    // return this.db.list('/orders')
    // .snapshotChanges().pipe(map(actions=>{
    //   return actions.map(action=>({key: action.key, ...action.payload.val() as Order}));
    // }))
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
    .snapshotChanges()
    .pipe(map(actions=>{
      return actions.map(action=>({key: action.key, ...action.payload.val() as Order}));  
  }));
   
  }
  }
