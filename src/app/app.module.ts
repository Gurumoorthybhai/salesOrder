import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './users/list-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppconfigModule } from './appconfig/appconfig.module';
import { ProductlistComponent } from './product/productlist.component';
import { CreateproductComponent } from './product/createproduct.component';
import { OutletlistComponent } from './outlet/outletlist.component';
import { CreateEditoutletComponent } from './outlet/create-editoutlet.component';
import { OrderlistComponent } from './order/orderlist.component';
import { NewOrdersComponent } from './newOrder/new-orders.component';
import { CartComponent } from './cart/cart.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { UserReportComponent } from './report-details/user-report.component';
import { OutletReportComponent } from './report-details/outlet-report.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    CreateUserComponent,
    ProductlistComponent,
    CreateproductComponent,
    OutletlistComponent,
    CreateEditoutletComponent,
    OrderlistComponent,
    NewOrdersComponent,
    CartComponent,
    ReportDetailsComponent,
    UserReportComponent,
    OutletReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppconfigModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
