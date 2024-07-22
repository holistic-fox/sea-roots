import { Component } from '@angular/core';
import {MapsModule} from "@syncfusion/ej2-angular-maps";
import * as worldMap from "../../models/world-map.json";

@Component({
  selector: 'marcura-global-map-display',
  standalone: true,
  imports: [MapsModule],
  templateUrl: './global-map-display.component.html',
  styleUrl: './global-map-display.component.scss'
})
export class GlobalMapDisplayComponent {
  layers = [{
    shapeData: worldMap
  }]
}
