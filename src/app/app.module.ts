import { OrderService } from './order.service';
import { CategoryService } from './category.service';
import {  AdminAuthGaurd } from './admin-auth-gaurd.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';



import { UpNavbarComponent } from './up-navbar/up-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { from } from 'rxjs';
import { AuthGaurd } from './auth-gaurd.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductService } from './product.service';
import { ProductFilterComponent } from './product/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { AdminOrderDetailsComponent } from './admin/admin-order/admin-order-details/admin-order-details.component';
import { MyOrderDetailsComponent } from './my-order/my-order-details/my-order-details.component';



@NgModule({
  declarations: [
    AppComponent,
    UpNavbarComponent,
    HomeComponent,
    ProductComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    AdminOrderDetailsComponent,
    MyOrderDetailsComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomFormsModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot([
      {path: "" ,component:ProductComponent},
      {path: "product" ,component:ProductComponent},
      {path: "shopping-cart" ,component:ShoppingCartComponent},
      {path: "login" ,component:LoginComponent},

      {path: "check-out" ,component:CheckOutComponent,canActivate:[AuthGaurd]},
      {path: "order-success/:id" ,component:OrderSuccessComponent,canActivate:[AuthGaurd]},
      {path: "my/order" ,component:MyOrderComponent,canActivate:[AuthGaurd]},
      {path: "my/order/:id" ,component:MyOrderDetailsComponent,canActivate:[AuthGaurd]},
     
     

  {
          path: "admin/products/new" ,
    component:ProductFormComponent,
    canActivate:[AuthGaurd, AdminAuthGaurd]
  },
  {
    path: "admin/products/:id" ,
      component:ProductFormComponent,
      canActivate:[AuthGaurd, AdminAuthGaurd]
  },
  {
      path: "admin/products" ,
    component:AdminProductsComponent,
    canActivate:[AuthGaurd, AdminAuthGaurd]
  },
  {
    path: "admin/orders" ,
  component:AdminOrdersComponent,
  canActivate:[AuthGaurd, AdminAuthGaurd]
},
{path: 'admin/orders/:id', 
component: AdminOrderDetailsComponent, 
canActivate: [AuthGaurd,AdminAuthGaurd]
},
    ]),
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGaurd,
    AdminAuthGaurd,
    UserService,
   CategoryService,
   ProductService,
   ShoppingCartService,
   OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
