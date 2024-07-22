import {Component, input, output} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'marcura-route-picker',
  standalone: true,
  imports: [
    JsonPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressBar,
  ],
  templateUrl: './route-picker.component.html',
  styleUrl: './route-picker.component.scss'
})
export class RoutePickerComponent {

  isLoading = input.required<boolean>();
  routes = input.required<{id: number, from: string, to: string}[]>()
  selectRoute = output<number>();

  onChange = (event: MatSelectChange) => this.selectRoute.emit(event.value);
}
