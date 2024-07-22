import {Component, inject} from '@angular/core';
import {RoutePickerComponent} from "./components/route-picker/route-picker.component";
import {GlobalMapDisplayComponent} from "./components/global-map-display/global-map-display.component";
import {SeaRoutesStore} from "./state/sea-routes.store";

@Component({
  selector: 'marcura-global-map',
  standalone: true,
  imports: [
    RoutePickerComponent,
    GlobalMapDisplayComponent,
  ],
  providers: [SeaRoutesStore],
  templateUrl: './global-map.component.html',
  styleUrl: './global-map.component.scss'
})
export class GlobalMapComponent {

  readonly store = inject(SeaRoutesStore);

  onRouteSelect = (event: number) => {
    console.log('onRouteSelect', event)
  }
}
