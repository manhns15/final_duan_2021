import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon'
import {MatStepperModule} from '@angular/material/stepper';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { authInterceptorProviders } from './interceptor/basic-auth-intercepter';
import { ErrorInterceptor } from './interceptor/error.interceptor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './cms-dhm/dashboard/dashboard.component';
import { LayoutComponent } from './cms-dhm/layout/layout.component';
import { Page404Component } from './cms-dhm/page404/page404.component';
import { AccountsComponent } from './cms-dhm/account/accounts/accounts.component';
import { AddAccountComponent } from './cms-dhm/account/add-account/add-account.component';
import { EditAccountComponent } from './cms-dhm/account/edit-account/edit-account.component';
import { BoomsComponent } from './cms-dhm/boom/booms/booms.component';
import { CustomerComponent } from './cms-dhm/customers/customer/customer.component';
import { AddCustomerComponent } from './cms-dhm/customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './cms-dhm/customers/edit-customer/edit-customer.component';
import { FooterComponent } from './cms-dhm/layout/footer/footer.component';
import { NavbarComponent } from './cms-dhm/layout/navbar/navbar.component';
import { SidebarComponent } from './cms-dhm/layout/sidebar/sidebar.component';
import { OdersComponent } from './cms-dhm/oder/oders/oders.component';
import { DetailOderComponent } from './cms-dhm/oder/detail-oder/detail-oder.component';
import { ProductComponent } from './cms-dhm/products/product/product.component';
import { AddProductComponent } from './cms-dhm/products/add-product/add-product.component';
import { EditProductComponent } from './cms-dhm/products/edit-product/edit-product.component';
import { ProductTypeComponent } from './cms-dhm/type/product-type/product-type.component';
import { LoginComponent } from './login/login.component';
import { AddBillComponent } from './cms-member/add-bill/add-bill.component';
import { BillsComponent } from './cms-member/bills/bills.component';
import { DetailBillsComponent } from './cms-member/detail-bills/detail-bills.component';
import { LayoutMemberComponent } from './cms-member/layout-member/layout-member.component';
import { FooterMemberComponent } from './cms-member/layout-member/footer-member/footer-member.component';
import { NavbarMemberComponent } from './cms-member/layout-member/navbar-member/navbar-member.component';
import { SidebarMemberComponent } from './cms-member/layout-member/sidebar-member/sidebar-member.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LayoutComponent,
    Page404Component,
    AccountsComponent,
    AddAccountComponent,
    EditAccountComponent,
    BoomsComponent,
    CustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    OdersComponent,
    DetailOderComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    ProductTypeComponent,
    LoginComponent,
    AddBillComponent,
    BillsComponent,
    DetailBillsComponent,
    LayoutMemberComponent,
    FooterMemberComponent,
    NavbarMemberComponent,
    SidebarMemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
        NgbPaginationModule,
        NgbAlertModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatStepperModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxDaterangepickerMd.forRoot(),
        ToastrModule.forRoot({
          timeOut: 5000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
          closeButton: false,
          progressBar: false
        }),
  ],
  providers: [authInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
