import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './cms-dhm/account/accounts/accounts.component';
import { AddAccountComponent } from './cms-dhm/account/add-account/add-account.component';
import { EditAccountComponent } from './cms-dhm/account/edit-account/edit-account.component';
import { AdminGuard } from './cms-dhm/admin/admin.guard';
import { BoomsComponent } from './cms-dhm/boom/booms/booms.component';
import { AddCustomerComponent } from './cms-dhm/customers/add-customer/add-customer.component';
import { CustomerComponent } from './cms-dhm/customers/customer/customer.component';
import { EditCustomerComponent } from './cms-dhm/customers/edit-customer/edit-customer.component';
import { DashboardComponent } from './cms-dhm/dashboard/dashboard.component';
import { LayoutComponent } from './cms-dhm/layout/layout.component';
import { DetailOderComponent } from './cms-dhm/oder/detail-oder/detail-oder.component';
import { OdersComponent } from './cms-dhm/oder/oders/oders.component';
import { Page404Component } from './cms-dhm/page404/page404.component';
import { AddProductComponent } from './cms-dhm/products/add-product/add-product.component';
import { EditProductComponent } from './cms-dhm/products/edit-product/edit-product.component';
import { ProductComponent } from './cms-dhm/products/product/product.component';
import { ProductTypeComponent } from './cms-dhm/type/product-type/product-type.component';
import { AddBillComponent } from './cms-member/add-bill/add-bill.component';
import { BillsComponent } from './cms-member/bills/bills.component';
import { DetailBillsComponent } from './cms-member/detail-bills/detail-bills.component';
import { LayoutMemberComponent } from './cms-member/layout-member/layout-member.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent, canActivate: [AdminGuard],
    children: [
      { path: '',
        component: DashboardComponent,
        canActivate: [AdminGuard],
      },
      //product
      { path: 'products',
        component: ProductComponent,
        canActivate: [AdminGuard]
      },
      { path: 'add-product', component: AddProductComponent, canActivate: [AdminGuard] },
      { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AdminGuard] },
      //type
      { path: 'type', component: ProductTypeComponent, canActivate: [AdminGuard] },
      //customer

      { path: 'customer', component: CustomerComponent, canActivate: [AdminGuard] },
      { path: 'add-customer', component: AddCustomerComponent, canActivate: [AdminGuard] },
      { path: 'edit-customer/:id', component: EditCustomerComponent, canActivate: [AdminGuard] },
      //account
      { path: 'accounts', component: AccountsComponent, canActivate: [AdminGuard] },
      { path: 'add-account', component: AddAccountComponent, canActivate: [AdminGuard] },
      { path: 'edit-account/:id', component: EditAccountComponent, canActivate: [AdminGuard] },

      //oder
      {path: 'oders', component:OdersComponent, canActivate: [AdminGuard]},
      {path:'detail-order/:sku', component:DetailOderComponent, canActivate: [AdminGuard]},
      //boom
      { path: 'booms', component: BoomsComponent, canActivate: [AdminGuard] },
    ]
  },
  // Member
  {
    path:'member', component: LayoutMemberComponent, canActivate: [AdminGuard],
    children:[
      {path:'bills', component:BillsComponent, canActivate: [AdminGuard]},
      {path:'bills/detail-bill/:sku', component:DetailBillsComponent, canActivate: [AdminGuard]},
      {path:'add-bill', component:AddBillComponent, canActivate: [AdminGuard]},
    ]
  },


  { path: 'khong-tim-thay-duong-dan', component: Page404Component },
  { path: '**', redirectTo: '/khong-tim-thay-duong-dan' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
