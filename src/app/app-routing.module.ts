import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEditorderlistComponent } from './order/create-editorderlist.component';
import { OrderlistComponent } from './order/orderlist.component';
import { CreateEditoutletComponent } from './outlet/create-editoutlet.component';
import { OutletlistComponent } from './outlet/outletlist.component';
import { CreateproductComponent } from './product/createproduct.component';
import { ProductlistComponent } from './product/productlist.component';
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
    path: 'createOrder',
    component: CreateEditorderlistComponent,
  },
  {
    path: 'editOrder/:id',
    component: CreateEditorderlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
