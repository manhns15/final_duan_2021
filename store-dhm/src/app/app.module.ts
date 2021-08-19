import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './dhmcolor/layout/layout.component';
import { HeaderComponent } from './dhmcolor/layout/header/header.component';
import { FooterComponent } from './dhmcolor/layout/footer/footer.component';
import { AboutComponent } from './dhmcolor/about/about.component';
import { AboutCategoryComponent } from './dhmcolor/about-category/about-category.component';
import { CartComponent } from './dhmcolor/cart/cart.component';
import { ContactComponent } from './dhmcolor/contact/contact.component';
import { HomeComponent } from './dhmcolor/home/home.component';
import { LoginComponent } from './dhmcolor/login/login.component';
import { Page404Component } from './dhmcolor/page404/page404.component';
import { ProductDetailComponent } from './dhmcolor/product-detail/product-detail.component';
import { RegisterComponent } from './dhmcolor/register/register.component';
import { SlideProductComponent } from './dhmcolor/slide-product/slide-product.component';
import { SliderComponent } from './dhmcolor/slider/slider.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { authInterceptorProviders } from './dhmcolor/interceptor/basic-auth-intercepter';
import { ErrorInterceptor } from './dhmcolor/interceptor/error.interceptor';
import { InforUserComponent } from './dhmcolor/infor-user/infor-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BillOfProductComponent } from './dhmcolor/bill-of-product/bill-of-product.component';
import { ForgotPassComponent } from './dhmcolor/forgot-pass/forgot-pass.component';
import { ChangePassComponent } from './dhmcolor/change-pass/change-pass.component';
import { DetailBillComponent } from './dhmcolor/detail-bill/detail-bill.component';
import { IntroduceComponent } from './dhmcolor/introduce/introduce.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    SliderComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    CartComponent,
    SlideProductComponent,
    ContactComponent,
    AboutCategoryComponent,
    InforUserComponent,
    BillOfProductComponent,
    ForgotPassComponent,
    ChangePassComponent,
    DetailBillComponent,
    IntroduceComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: false,
      progressBar: false
    }),
  ],
  providers: [authInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
