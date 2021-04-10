import { Product } from './../models/product.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from '../appconfig/appconfig.module';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.getProductDetails().subscribe((data) => {
      this.productData.next(data);
    });
  }

  loadData(): Observable<any> {
    return this.productData.asObservable();
  }

  baseURL = this.config.apiEndpoint + '/api/products/';

  getProductDetails(): Observable<any> {
    console.log(this.baseURL + 'getAllProducts');
    return this.http
      .get(this.baseURL + 'getAllProducts')
      .pipe(catchError(this.errorHandler));
  }

  insertProductDetails(req: any) {
    // console.log("Engine req type", typeof (req));
    console.log('Product details data', req);
    return this.http
      .post(this.baseURL + 'createProduct', req)
      .pipe(catchError(this.errorHandler));
  }

  updateProductDetails(req: any) {
    // console.log("req",req);
    return this.http
      .put(this.baseURL + 'editProduct', req)
      .pipe(catchError(this.errorHandler));
  }

  deleteProductDetails(req: number): Observable<any> {
    console.log(req);
    return this.http
      .delete(this.baseURL + `deleteProduct/${req}`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server Error');
  }
}
