
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home';

import {SignupComponent} from './component/signup/signup'
import { LoginComponent } from './component/login/login';
import { RestaurantDashboards } from './component/restaurant/restaurant-dashboard/restaurant-dashboard';
import { ProfileCompletion } from './component/restaurant/profilecompletion/profilecompletion';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
{ path: 'profilecompletion', component: ProfileCompletion },
{ path: 'dashboard/restaurant', component:  RestaurantDashboards  },
];