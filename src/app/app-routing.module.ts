import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/homepage/home/home.component';
import { LoginComponent } from './components/homepage/login/login.component';
import { HomeContentComponent } from './components/homepage/home-content/home-content.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { RegisterComponent } from './components/homepage/register/register.component';
import { CustomerComponent } from './components/customers/customer/customer.component';
import { OrderComponent } from './components/customers/order/order.component';
import { MyOrdersComponent } from './components/customers/my-orders/my-orders.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { ManagerComponent } from './components/managers/manager/manager.component';
import { CookComponent } from './components/cooks/cook/cook.component';
import { DeliveryPersonComponent } from './components/delivery-people/delivery-person/delivery-person.component';
import { SalespersonComponent } from './components/salespeople/salesperson/salesperson.component';
import { CheckoutComponent } from './components/customers/checkout/checkout.component';


const routes: Routes = [
  {path:'', component:HomeComponent,children:[
    {path:'',component:HomeContentComponent},
    {path:'login',component:LoginComponent},
    {path:'menu',component:MenuComponent},
    {path:'register',component:RegisterComponent}
  ]},
  {path:"customer",component:CustomerComponent, children:[
    {path:"",component:HomeContentComponent},
    {path:"order",component:OrderComponent},
    {path:"my-orders",component:MyOrdersComponent},
    {path:"checkout",component:CheckoutComponent}
  ]},
  {path:"manager", component:ManagerComponent},
  {path:"cook",component:CookComponent},
  {path:"delivery-person",component:DeliveryPersonComponent},
  {path:"salesperson",component:SalespersonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
