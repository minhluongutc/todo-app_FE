import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideAnimations(),
    provideHttpClient(),
    // provideRouter(routes),
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: {
        disabled: false,
        animation: { enterDuration: 200, exitDuration: 150 },
      },
    },
  ],
};

