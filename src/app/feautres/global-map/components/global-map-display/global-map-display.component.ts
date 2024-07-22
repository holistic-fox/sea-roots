import { Component } from '@angular/core';
import {Maps, MapsModule, MapsTooltip, NavigationLine} from "@syncfusion/ej2-angular-maps";
import * as worldMap from "../../models/world-map.json";

Maps.Inject(MapsTooltip, NavigationLine);

@Component({
  selector: 'marcura-global-map-display',
  standalone: true,
  imports: [MapsModule],
  templateUrl: './global-map-display.component.html',
  styleUrl: './global-map-display.component.scss'
})
export class GlobalMapDisplayComponent {

  layers = [{
    shapeData: worldMap,
    navigationLineSettings: [{
      visible: true,
      latitude: [37.772, -122.214],
      longitude: [-122.214, -122.214],
      color: 'red',
      width: 1
    }]
  }]
}
