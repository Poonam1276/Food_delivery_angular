import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './component/home/home';
import { routes } from './app.routes'; // ✅ Correct import
import { FormsModule } from '@angular/forms';
import { tokenInterceptor } from './token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    importProvidersFrom(FormsModule),
    HomeComponent
  ]
};

// ✅ No need to repeat providers here if you're using `appConfig`
// bootstrapApplication(HomeComponent, appConfig);