
import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home';

import {SignupComponent} from './component/signup/signup'
import { AgentDetails } from './component/deliveryAgent/agent-details/agent-details';


export const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', component: AgentDetails },
  { path: 'signup', component: SignupComponent }
  
];