import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from '../appconfig/appconfig.module';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  baseURL = this.config.apiEndpoint + '/api/reports/';

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  /*   getUserReportDetails(): Observable<any> {
    console.log(this.baseURL + 'getAllOutlets');
    return this.http
      .get(this.baseURL + 'getAllOutlets')
      .pipe(catchError(this.errorHandler));
  } */

  insertUserFilterDate(req: any) {
    console.log('User details data', this.baseURL + 'userDateFilter');
    return this.http
      .post(this.baseURL + 'userDateFilter', req)
      .pipe(catchError(this.errorHandler));
  }
  insertProductFilterDate(req: any) {
    console.log('Product details data', this.baseURL + 'productDateFilter');
    return this.http
      .post(this.baseURL + 'productDateFilter', req)
      .pipe(catchError(this.errorHandler));
  }
  insertOutletFilterDate(req: any) {
    console.log('Outlet details data', this.baseURL + 'outletDateFilter');
    return this.http
      .post(this.baseURL + 'outletDateFilter', req)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server Error');
  }
}
