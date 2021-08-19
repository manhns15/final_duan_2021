import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutCategoryComponent } from './dhmcolor/about-category/about-category.component';
import { AboutComponent } from './dhmcolor/about/about.component';
import { BillOfProductComponent } from './dhmcolor/bill-of-product/bill-of-product.component';
import { CartComponent } from './dhmcolor/cart/cart.component';
import { ChangePassComponent } from './dhmcolor/change-pass/change-pass.component';
import { ContactComponent } from './dhmcolor/contact/contact.component';
import { ForgotPassComponent } from './dhmcolor/forgot-pass/forgot-pass.component';
import { HomeComponent } from './dhmcolor/home/home.component';
import { InforUserComponent } from './dhmcolor/infor-user/infor-user.component';
import { LayoutComponent } from './dhmcolor/layout/layout.component';
import { LoginComponent } from './dhmcolor/login/login.component';
import { Page404Component } from './dhmcolor/page404/page404.component';
import { ProductDetailComponent } from './dhmcolor/product-detail/product-detail.component';
import { RegisterComponent } from './dhmcolor/register/register.component';
import {DetailBillComponent} from './dhmcolor/detail-bill/detail-bill.component';
import { IntroduceComponent } from './dhmcolor/introduce/introduce.component';
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'about/search/:keyword', component: AboutComponent },
      { path: 'about/:id', component: AboutCategoryComponent },
      { path: 'introduce', component: IntroduceComponent},
      { path: 'cart', component: CartComponent },
      { path: 'product-detail/:id', component: ProductDetailComponent },
      { path: 'about/product-detail/:id', component: ProductDetailComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'inforUser', component: InforUserComponent },
      { path: 'billproduct', component: BillOfProductComponent },
      { path: 'detail-bill/:sku', component: DetailBillComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'forgot-pass' ,component: ForgotPassComponent},
  {path:'change-pass' ,component: ChangePassComponent},
  { path: 'khong-tim-thay-duong-dan', component: Page404Component },
  { path: '**', redirectTo: '/khong-tim-thay-duong-dan' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
