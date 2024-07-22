import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base'

registerLicense('Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCdkx0RHxbf1x0ZFRHal1QTnRWUiweQnxTdEFjXn1ccXVURGFdWUN+Vw==');
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
