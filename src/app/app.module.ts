import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/homepage/home/home.component';
import { HomeNavbarComponent } from './components/homepage/home-navbar/home-navbar.component';
import { HomeContentComponent } from './components/homepage/home-content/home-content.component';
import { LoginComponent } from './components/homepage/login/login.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { ProductService } from './services/product.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ProductCardComponent } from './components/shared/product-card/product-card.component';
import { RegisterComponent } from './components/homepage/register/register.component';
import { CustomerComponent } from './components/customers/customer/customer.component';
import { CustomerNavbarComponent } from './components/customers/customer-navbar/customer-navbar.component';
import { OrderComponent } from './components/customers/order/order.component';
import { MyOrdersComponent } from './components/customers/my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeNavbarComponent,
    HomeContentComponent,
    LoginComponent,
    MenuComponent,
    ProductCardComponent,
    RegisterComponent,
    CustomerComponent,
    CustomerNavbarComponent,
    OrderComponent,
    MyOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
