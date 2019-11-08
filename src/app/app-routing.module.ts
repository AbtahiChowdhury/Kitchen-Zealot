import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/homepage/home/home.component';
import { LoginComponent } from './components/homepage/login/login.component';
import { HomeContentComponent } from './components/homepage/home-content/home-content.component';
import { MenuComponent } from './components/shared/menu/menu.component';


const routes: Routes = [
  {path:'', component:HomeComponent,children:[
    {path:'',component:HomeContentComponent},
    {path:'login',component:LoginComponent},
    {path:'menu',component:MenuComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
