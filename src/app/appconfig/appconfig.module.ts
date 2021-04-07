import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  //development
  apiEndpoint: string;
}

export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:4000',
  //apiEndpoint: 'https://vyn6jyult7.execute-api.ap-south-1.amazonaws.com/test',

  //Old PROD
  //apiEndpoint:"https://0cnbu8xlo0.execute-api.ap-south-1.amazonaws.com/prod"

  // New PROD
  //apiEndpoint: 'https://6dfxpqy76a.execute-api.ap-south-1.amazonaws.com/Prod',
};

@NgModule({
  providers: [
    {
      provide: APP_CONFIG,
      useValue: APP_DI_CONFIG,
    },
  ],
})
export class AppconfigModule {
  onActivate(e, outlet) {
    outlet.scrollTop = 0;
  }
}
