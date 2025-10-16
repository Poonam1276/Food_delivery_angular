
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home';
import { MenuComponent } from './component/menu/menu';
import {CartComponent} from './component/cart/cart'
import { SignupComponent } from './component/signup/signup';
import { LoginComponent } from './component/login/login';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  {path:'cart', component:CartComponent}

];