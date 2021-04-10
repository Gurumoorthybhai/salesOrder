import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.scss'],
})
export class CreateproductComponent implements OnInit {
  productform: FormGroup;
  savebtn: boolean;
  productId;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.savebtn = true;
    this.productform = this.fb.group({
      productName: ['', Validators.required],
      productCost: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      this.productId = +params.get('id');
      if (this.productId) {
        this.savebtn = false;
        this.getProductDetails(this.productId);
      }
    });
  }
  getProductDetails(id: number) {
    console.log('getproductDetails', id);
    this.productService.getProductDetails().subscribe((data) => {
      console.log('data', data);
      const productDetails = data.filter((data) => data.productId == id);
      this.editProductDetails(productDetails);
    });
  }

  editProductDetails(product: Product) {
    console.log('editproductDetails', product);
    this.productform.patchValue({
      productName: product[0]['productName'],
      productCost: product[0]['productCost'],
    });
  }
  saveProductDetails(req) {
    if (this.productform.valid) {
      this.productService.insertProductDetails(req).subscribe(
        (data) => {
          if (data) {
            alert('product added successfully');
            this.router.navigate(['productlist']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  updateProductDetails(req) {
    if (this.productform.valid) {
      req.productId = this.productId;
      this.productService.updateProductDetails(req).subscribe(
        (data) => {
          if (data) {
            alert('product updated successfully');
            this.router.navigate(['productlist']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
