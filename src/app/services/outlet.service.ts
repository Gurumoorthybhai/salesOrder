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
export class OutletService {
  private outletData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.getOutletDetails().subscribe((data) => {
      this.outletData.next(data);
    });
  }

  loadData(): Observable<any> {
    return this.outletData.asObservable();
  }
  baseURL = this.config.apiEndpoint + '/api/outlets/';

  getOutletDetails(): Observable<any> {
    console.log(this.baseURL + 'getAllOutlets');
    return this.http
      .get(this.baseURL + 'getAllOutlets')
      .pipe(catchError(this.errorHandler));
  }

  insertOutletDetails(req: any) {
    // console.log("Engine req type", typeof (req));
    console.log('Outlet details data', req);
    return this.http
      .post(this.baseURL + 'createOutlet', req)
      .pipe(catchError(this.errorHandler));
  }

  updateOutletDetails(req: any) {
    // console.log("req",req);
    return this.http
      .put(this.baseURL + 'editOutlet', req)
      .pipe(catchError(this.errorHandler));
  }

  deleteOutletDetails(req: number): Observable<any> {
    console.log(req);
    return this.http
      .delete(this.baseURL + `deleteOutlet/${req}`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server Error');
  }
}
