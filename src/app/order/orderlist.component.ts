import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
})
export class OrderlistComponent implements OnInit {
  Orders: any;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }
  getOrderDetails() {
    this.orderService.getOrderDetails().subscribe(
      (data) => {
        if (data) {
          this.Orders = data;
          console.log('this.Orders ***', this.Orders);
        }
      },
      (error) => {
        console.log('error in getting ProductDetails');
      }
    );
  }
}
