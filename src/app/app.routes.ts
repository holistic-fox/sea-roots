import {Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";

export enum ROUTE_PATHS {
  home = '',
  wildcard = '**'
}

export const routes: Routes = [{
  path: ROUTE_PATHS.home, component: HomePageComponent,
}, {
  path: ROUTE_PATHS.wildcard, redirectTo: ROUTE_PATHS.home,
}];
