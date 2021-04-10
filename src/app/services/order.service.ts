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
export class OrderService {
  private orderData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.getOrderDetails().subscribe((data) => {
      this.orderData.next(data);
    });
  }

  loadData(): Observable<any> {
    return this.orderData.asObservable();
  }
  baseURL = this.config.apiEndpoint + '/api/orders/';

  getOrderDetails(): Observable<any> {
    console.log(this.baseURL + 'getAllOrders');
    return this.http
      .get(this.baseURL + 'getAllOrders')
      .pipe(catchError(this.errorHandler));
  }

  insertOrderDetails(req: any) {
    // console.log("Engine req type", typeof (req));
    console.log('Order details data', req);
    return this.http
      .post(this.baseURL + 'createOrder', req)
      .pipe(catchError(this.errorHandler));
  }

  updateOrderDetails(req: any) {
    console.log('updateOrderDetails', req);
    return this.http
      .put(this.baseURL + 'editOrder', req)
      .pipe(catchError(this.errorHandler));
  }

  deleteOrderDetails(req: number): Observable<any> {
    console.log(req);
    return this.http
      .delete(this.baseURL + `deleteOrder/${req}`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server Error');
  }
}
