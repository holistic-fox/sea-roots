import {Component, inject, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'marcura-route-picker',
  standalone: true,
  imports: [],
  templateUrl: './route-picker.component.html',
  styleUrl: './route-picker.component.scss'
})
export class RoutePickerComponent implements OnInit {
  private api = inject(ApiService);


  ngOnInit() {
    this.api.getSeaRoutes().subscribe(x => console.log(x))
  }
}
