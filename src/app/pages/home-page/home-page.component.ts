import { Component } from '@angular/core';
import {GlobalMapComponent} from "../../feautres/global-map/global-map.component";

@Component({
  selector: 'sea-roots-home-page',
  standalone: true,
  imports: [
    GlobalMapComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
