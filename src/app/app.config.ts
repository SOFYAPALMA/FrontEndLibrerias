import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  provideAnimationsAsync(),
  importProvidersFrom(HttpClientModule), provideAnimationsAsync()
]
};
