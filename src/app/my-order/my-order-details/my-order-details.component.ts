import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/order.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'my-order-details',
  templateUrl: './my-order-details.component.html',
  styleUrls: ['./my-order-details.component.css']
})
export class MyOrderDetailsComponent implements OnInit {

  id;
  product$;
  
  constructor(
    route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.id = route.snapshot.paramMap.get('id');
    if(this.id) orderService.getSingleOrder(this.id).pipe(take(1)).subscribe();
  }

  async ngOnInit(){
    this.product$ = await this.orderService.getSingleOrder(this.id).pipe(take(1));
  }

}
