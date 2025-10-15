
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home';

import {SignupComponent} from './component/signup/signup'


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
];