import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
})
export class ProductlistComponent implements OnInit {
  Products: any;

  constructor(private router: Router, private productService: ProductService) {}
  ngOnInit(): void {
    //console.log('dummyData', dummyData);
    this.getProductDetails();
  }

  addProduct() {
    this.router.navigate(['createProduct']);
  }

  deleteProduct(ProductId: number) {
    this.productService.deleteProductDetails(ProductId).subscribe(
      (res) => {
        if (res) {
          alert('ProductDetails deleted successfully');
          // alert("Records deleted successfully");
          this.getProductDetails();
        }
      },
      (err) => {
        alert('Error in deleting ProductDetails');

        //alert("Error in deleting Records");
        console.log(err);
      }
    );
  }
  editProduct(ProductID: number) {
    console.log('ProductID', ProductID);
    this.router.navigate(['editProduct', ProductID]);
  }

  getProductDetails() {
    this.productService.getProductDetails().subscribe(
      (data) => {
        if (data) {
          this.Products = data;
        }
      },
      (error) => {
        console.log('error in getting ProductDetails');
      }
    );
  }
}
