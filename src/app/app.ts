import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './component/home/home';
import {SignupComponent} from './component/signup/signup'
import { AgentDetails } from './component/deliveryAgent/agent-details/agent-details';

@Component({
  selector: 'app-root',
  imports: [ HomeComponent, SignupComponent,AgentDetails],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
}
