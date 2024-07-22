import {Component, effect, input} from '@angular/core';
import {LayerSettingsModel, Maps, MapsModule, MapsTooltip, NavigationLine} from "@syncfusion/ej2-angular-maps";
import * as worldMap from "../../models/world-map.json";
import {NavigationLineSettingsModel} from "@syncfusion/ej2-maps/src/maps/model/base-model";
import {JsonPipe} from "@angular/common";

Maps.Inject(MapsTooltip, NavigationLine);

@Component({
  selector: 'marcura-global-map-display',
  standalone: true,
  imports: [MapsModule, JsonPipe],
  templateUrl: './global-map-display.component.html',
  styleUrl: './global-map-display.component.scss'
})
export class GlobalMapDisplayComponent{

  navigationLine = input<NavigationLineSettingsModel[]>();

  constructor() {
    effect(() => {
      this.layers = [{
        shapeData: worldMap,
        navigationLineSettings: this.navigationLine()
      }]
    });
  }

  layers: LayerSettingsModel[] = [{
    shapeData: worldMap,
    navigationLineSettings: []
  }]

}
