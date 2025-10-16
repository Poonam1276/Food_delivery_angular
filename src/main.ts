import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { App } from './app/app';
import { HomeComponent } from './app/component/home/home';
import { MenuComponent } from './app/component/menu/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
 { path: '', component: HomeComponent }, // default landing page
 { path: 'menu', component: MenuComponent } // menu page
];
bootstrapApplication(App, {
 providers: [
   importProvidersFrom(RouterModule.forRoot(routes), FormsModule, HttpClientModule)
 ]
}).catch(err => console.error(err));