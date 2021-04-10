import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { NewOrdersComponent } from './newOrder/new-orders.component';
import { OrderlistComponent } from './order/orderlist.component';
import { CreateEditoutletComponent } from './outlet/create-editoutlet.component';
import { OutletlistComponent } from './outlet/outletlist.component';
import { CreateproductComponent } from './product/createproduct.component';
import { ProductlistComponent } from './product/productlist.component';
import { OutletReportComponent } from './report-details/outlet-report.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { UserReportComponent } from './report-details/user-report.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { ListUsersComponent } from './users/list-users.component';

const routes: Routes = [
  {
    path: 'userslist',
    component: ListUsersComponent,
  },
  {
    path: 'createUser',
    component: CreateUserComponent,
  },
  {
    path: 'editUser/:id',
    component: CreateUserComponent,
  },
  {
    path: 'productlist',
    component: ProductlistComponent,
  },
  {
    path: 'createProduct',
    component: CreateproductComponent,
  },
  {
    path: 'editProduct/:id',
    component: CreateproductComponent,
  },
  {
    path: 'outletlist',
    component: OutletlistComponent,
  },
  {
    path: 'createOutlet',
    component: CreateEditoutletComponent,
  },
  {
    path: 'editOutlet/:id',
    component: CreateEditoutletComponent,
  },
  {
    path: 'orderlist',
    component: OrderlistComponent,
  },
  {
    path: 'newOrder/:id',
    component: NewOrdersComponent,
  },

  {
    path: 'ordersList/:id',
    component: CartComponent,
  },
  {
    path: 'report',
    component: ReportDetailsComponent,
  },
  {
    path: 'userreport',
    component: UserReportComponent,
  },
  {
    path: 'outletreport',
    component: OutletReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
