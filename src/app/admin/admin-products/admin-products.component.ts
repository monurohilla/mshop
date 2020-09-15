import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
products: any[] ;
filterdproducts:any[];
subscription:Subscription;

  constructor(private productService:ProductService) { 
this.subscription=this.productService.getAll()
.subscribe(products=> this.filterdproducts= this.products =products)
  }
  filter(query:string){
this.filterdproducts= (query) ?
this.products.filter(p =>p.title.toLowerCase().includes(query.toLowerCase())) :
this.products;
  }
ngOnDestroy(){
this.subscription.unsubscribe()
}
  ngOnInit(): void {
  }

}
