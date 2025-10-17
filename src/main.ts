import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { App } from './app/app';
import { HomeComponent } from './app/component/home/home';
import { MenuComponent } from './app/component/menu/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './app/component/login/login';
import { SignupComponent } from './app/component/signup/signup';
import { CartComponent } from './app/component/cart/cart';
import { CustomerDashboard } from './app/component/customer-dashboard/customer-dashboard';
import { About } from './app/component/about/about';
import { AdminDasboard } from './app/component/admin-dasboard/admin-dasboard';
import { PlaceOrderComponent } from './app/component/orders/orders';
const routes: Routes = [
 { path: '', component: HomeComponent }, // default landing page
 { path: 'menu', component: MenuComponent }, // menu page
  { path: 'signup', component: SignupComponent },
   { path: 'login', component: LoginComponent },
    {path:'cart', component:CartComponent},
    {path: 'customer-dashboard', component: CustomerDashboard}, 
    {path:'about', component: About},
      {path:'admin', component:AdminDasboard},
      {
 path: 'place-order',
 component: PlaceOrderComponent
}
];
bootstrapApplication(App, {
 providers: [
   importProvidersFrom(RouterModule.forRoot(routes), FormsModule, HttpClientModule)
 ]
}).catch(err => console.error(err));