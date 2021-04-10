import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import * as _moment from 'moment';
@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.scss'],
})
export class NewOrdersComponent implements OnInit {
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
    private orderService: OrderService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProductDetails();
    this.route.paramMap.subscribe((params) => {
      this.outletId = +params.get('id');
    });
  }

  getProductDetails() {
    this.productService.getProductDetails().subscribe(
      (data) => {
        if (data) {
          this.Products = data;
          console.log('this.Products', this.Products);
        }
      },
      (error) => {
        console.log('error in getting ProductDetails');
      }
    );
  }

  newOrders(product) {
    // console.log('this.Products', selectedValue);
    this.orderDetails['quantity'] = this.selectedValue;
    this.orderDetails['productDetailProductId'] = product.productId;
    this.orderDetails['outletDetailOutletId'] = this.outletId;
    this.orderDetails['userDetailUserId'] = this.userId;
    this.orderDetails['total'] = this.selectedValue * product.productCost;
    this.orderDetails['createdAt'] = new Date();
    this.orderDetails['createdBy'] = this.userId;
    this.orderService
      .insertOrderDetails(this.orderDetails)
      .subscribe((data) => {
        if (data) {
          alert('order placed successfully');
          this.router.navigate(['ordersList', this.outletId]);
        }
      });
    console.log('order details', this.orderDetails);
  }
}
