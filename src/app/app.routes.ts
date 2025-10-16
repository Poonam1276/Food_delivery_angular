import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home';
import {SignupComponent} from './component/signup/signup'
import { LoginComponent } from './component/login/login';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
 
  { path: 'login', component: LoginComponent },

];