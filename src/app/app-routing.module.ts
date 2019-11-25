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
import { CheckoutComponent } from './components/shared/checkout/checkout.component';
import { ProfileComponent } from './components/customers/profile/profile.component';
import { ViewOrderComponent } from './components/shared/view-order/view-order.component';
import { EmployeesComponent } from './components/managers/employees/employees.component';
import { CustomersComponent } from './components/managers/customers/customers.component';
import { ViewEmployeeComponent } from './components/managers/view-employee/view-employee.component';
import { ViewCustomerComponent } from './components/managers/view-customer/view-customer.component';
import { AddEmployeeComponent } from './components/managers/add-employee/add-employee.component';
import { AllOrdersComponent } from './components/managers/all-orders/all-orders.component';
import { GuestComponent } from './components/guests/guest/guest.component';
import { GuestOrderComponent } from './components/guests/guest-order/guest-order.component';
import { CustomerCheckoutComponent } from './components/customers/customer-checkout/customer-checkout.component';
import { GuestCheckoutComponent } from './components/guests/guest-checkout/guest-checkout.component';
import { PendingBidsComponent } from './components/delivery-people/pending-bids/pending-bids.component';
import { DeliveredOrdersComponent } from './components/delivery-people/delivered-orders/delivered-orders.component';
import { ModifyMenuComponent } from './components/cooks/modify-menu/modify-menu.component';


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
    {path:"my-orders/:uid",component:ViewOrderComponent},
    {path:"my-orders",component:MyOrdersComponent},
    {path:"checkout",component:CustomerCheckoutComponent},
    {path:"profile",component:ProfileComponent}
  ]},
  {path:"manager", component:ManagerComponent, children:[
    {path:"",component:HomeContentComponent},
    {path:"employees/add",component:AddEmployeeComponent},
    {path:"employees/:uid",component:ViewEmployeeComponent},
    {path:"employees",component:EmployeesComponent},
    {path:"customers/:uid",component:ViewCustomerComponent},
    {path:"customers",component:CustomersComponent},
    {path:"orders/:uid",component:ViewOrderComponent},
    {path:"orders",component:AllOrdersComponent},
  ]},
  {path:"guest",component:GuestComponent, children:[
    {path:"",component:HomeContentComponent},
    {path:"order",component:GuestOrderComponent},
    {path:"checkout",component:GuestCheckoutComponent}
  ]},

  {path:"cook",component:CookComponent, children:[
    {path:"",component:HomeContentComponent},
    {path:"modify-menu",component:ModifyMenuComponent},
  ]},

  {path:"delivery",component:DeliveryPersonComponent, children:[
    {path:"",component:HomeContentComponent},
    {path:"pending-bids",component:PendingBidsComponent},
    {path:"delivered-orders",component:DeliveredOrdersComponent}
  ]},
  {path:"salesperson",component:SalespersonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
