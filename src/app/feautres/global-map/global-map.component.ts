import { Component } from '@angular/core';
import {RoutePickerComponent} from "./components/route-picker/route-picker.component";
import {GlobalMapDisplayComponent} from "./components/global-map-display/global-map-display.component";

@Component({
  selector: 'marcura-global-map',
  standalone: true,
  imports: [
    RoutePickerComponent,
    GlobalMapDisplayComponent,
  ],
  templateUrl: './global-map.component.html',
  styleUrl: './global-map.component.scss'
})
export class GlobalMapComponent {

}
