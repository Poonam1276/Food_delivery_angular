import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home';
import { SignupComponent } from './component/signup/signup';
import { LoginComponent } from './component/login/login';
import { AgentDetails } from './component/deliveryAgent/agent-details/agent-details';
import { DeliveryAgentDashboard } from './component/deliveryAgent/delivery-agent-dashboard/delivery-agent-dashboard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'delivery-agent-details', component: AgentDetails },
  { path: 'delivery-agent/dashboard', component: DeliveryAgentDashboard}
  
];