import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home';
import {SignupComponent} from './component/signup/signup'
import { LoginComponent } from './component/login/login';
import { AgentDetails } from './component/deliveryAgent/agent-details/agent-details';
import { DeliveryAgentDashboard } from './component/deliveryAgent/delivery-agent-dashboard/delivery-agent-dashboard';


import {CartComponent} from './component/cart/cart';
import {About} from './component/about/about';
import {AdminDasboard} from './component/admin-dasboard/admin-dasboard'
import { MenuComponent } from './component/menu/menu';
import {adminGuard} from './auth/admin-guard';
import {OrderComponent} from './component/order/order';
import { CustomerDashboard } from './component/customer-dashboard/customer-dashboard';


import { ProfileCompletion } from './component/restaurant/profilecompletion/profilecompletion';
import { RestaurantDashboard } from './component/restaurant/restaurant-dashboard/restaurant-dashboard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },


  { path: 'login', component: LoginComponent },
{ path: 'profilecompletion', component: ProfileCompletion },
{ path: 'dashboard', component:  RestaurantDashboard },

  { path: 'menu', component: MenuComponent },
 
  {path:'cart', component:CartComponent},
  {path:'about', component:About},
  {path:'customer-dashboard', component:CustomerDashboard},
  {
  path: 'admin',
  component: AdminDasboard,
  canActivate: [adminGuard]
},
{ path: 'order', component: OrderComponent },

  { path: 'delivery-agent-details', component: AgentDetails },
  { path: 'delivery-agent/dashboard', component: DeliveryAgentDashboard}


];