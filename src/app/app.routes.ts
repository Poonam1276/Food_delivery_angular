
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home';

import {SignupComponent} from './component/signup/signup'
import { MenuComponent } from './component/menu/menu';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'menu', component: MenuComponent },
];