import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  Products: any;
  outletId: number;
  userId: number = 1;
  quantities: any = [
    { count: 1 },
    { count: 2 },
    { count: 3 },
    { count: 4 },
    { count: 5 },
    { count: 6 },
    { count: 7 },
  ];
  selectedValue: number = 1;
  orderDetails: {} = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
    this.route.paramMap.subscribe((params) => {
      this.outletId = +params.get('id');
    });
  }

  getProductDetails() {
    this.orderService.getOrderDetails().subscribe(
      (data) => {
        if (data) {
          this.Products = data.filter((data) => data.outletId == this.outletId);

          console.log('this.orders', data);
        }
      },
      (error) => {
        console.log('error in getting ProductDetails');
      }
    );
  }

  newOrders(product) {
    this.orderDetails['orderId'] = product.orderId;
    this.orderDetails['quantity'] = this.selectedValue;
    this.orderDetails['total'] = this.selectedValue * product.productCost;
    // this.orderDetails['createdAt'] = moment(new Date();
    this.orderDetails['createdBy'] = this.userId;
    this.orderService
      .updateOrderDetails(this.orderDetails)
      .subscribe((data) => {
        if (data) {
          alert('order placed successfully');
          this.router.navigate(['ordersList', this.outletId]);
        }
      });
    console.log('order details', this.orderDetails);
  }

  deleteOrder(orderId) {
    this.orderService.deleteOrderDetails(orderId).subscribe((data) => {
      if (data) {
        alert('Order Deleted successfully');
        this.getProductDetails();
      }
    });
  }
}
