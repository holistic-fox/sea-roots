import {Component, effect, input} from '@angular/core';
import {
  LayerSettingsModel,
  Maps,
  MapsModule,
  MapsTooltip,
  Marker, MarkerSettingsModel,
  NavigationLine,
  Zoom
} from "@syncfusion/ej2-angular-maps";
import * as worldMap from "../../models/world-map.json";
import {NavigationLineSettingsModel} from "@syncfusion/ej2-maps/src/maps/model/base-model";
import {JsonPipe} from "@angular/common";

Maps.Inject(MapsTooltip, NavigationLine, Zoom, Marker);

@Component({
  selector: 'marcura-global-map-display',
  standalone: true,
  imports: [MapsModule, JsonPipe],
  templateUrl: './global-map-display.component.html',
  styleUrl: './global-map-display.component.scss'
})
export class GlobalMapDisplayComponent{

  navigationLine = input<NavigationLineSettingsModel[]>();
  markers=input<MarkerSettingsModel[]>()

  constructor() {
    effect(() => {
      this.layers = [{
        shapeData: worldMap,
        markerSettings: this.markers(),
        navigationLineSettings: this.navigationLine()
      }]
    });
  }

  zoomSettings: object = {
    enable: true,
    toolbars: ['ZoomIn', 'ZoomOut', 'Reset']
  };

  layers: LayerSettingsModel[] = [{
    shapeData: worldMap,
    navigationLineSettings: []
  }]

}
