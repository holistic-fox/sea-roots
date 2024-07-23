import {Component, inject} from '@angular/core';
import {RoutePickerComponent} from "./components/route-picker/route-picker.component";
import {GlobalMapDisplayComponent} from "./components/global-map-display/global-map-display.component";
import {SeaRoutesStore} from "./state/sea-routes.store";
import {JsonPipe} from "@angular/common";
import {SpeedChartComponent} from "./components/speed-chart/speed-chart.component";

@Component({
  selector: 'marcura-global-map',
  standalone: true,
  imports: [
    RoutePickerComponent,
    GlobalMapDisplayComponent,
    JsonPipe,
    SpeedChartComponent,
  ],
  providers: [SeaRoutesStore],
  templateUrl: './global-map.component.html',
  styleUrl: './global-map.component.scss'
})
export class GlobalMapComponent {

  readonly store = inject(SeaRoutesStore);

  onRouteSelect = (event: number) =>  this.store.setSelectedRouteId(event)

}
