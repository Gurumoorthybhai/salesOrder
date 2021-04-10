import { Inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  JsonpClientBackend,
} from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

import { AppConfig, APP_CONFIG } from 'src/app/appconfig/appconfig.module';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.getUserDetails().subscribe((data) => {
      this.userData.next(data);
    });
  }

  loadData(): Observable<any> {
    return this.userData.asObservable();
  }

  baseURL = this.config.apiEndpoint + '/api/users/';

  getUserDetails(): Observable<any> {
    console.log(this.baseURL + 'getAllUsers');
    return this.http
      .get(this.baseURL + 'getAllUsers')
      .pipe(catchError(this.errorHandler));
  }

  insertUserDetails(req: any) {
    // console.log("Engine req type", typeof (req));
    console.log('User details data', req);
    return this.http
      .post(this.baseURL + 'createUser', req)
      .pipe(catchError(this.errorHandler));
  }

  updateUserDetails(req: any) {
    // console.log("req",req);
    return this.http
      .put(this.baseURL + 'editUser', req)
      .pipe(catchError(this.errorHandler));
  }

  deleteUserDetails(req: number): Observable<any> {
    console.log(req);
    return this.http
      .delete(this.baseURL + `deleteUser/${req}`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server Error');
  }
}
