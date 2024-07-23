import {Component, input, output} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatRadioButton, MatRadioChange, MatRadioGroup} from "@angular/material/radio";
import {MatDivider} from "@angular/material/divider";
import {MatToolbar} from "@angular/material/toolbar";
import {SortBy} from "../../models/sort-by";
import {SortOrder} from "../../models/sort-order";

@Component({
  selector: 'marcura-route-picker',
  standalone: true,
  imports: [
    JsonPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressBar,
    MatRadioGroup,
    MatRadioButton,
    MatDivider,
    MatToolbar,
  ],
  templateUrl: './route-picker.component.html',
  styleUrl: './route-picker.component.scss'
})
export class RoutePickerComponent {

  isLoading = input.required<boolean>();
  routes = input.required<{ id: number, from: string, to: string }[]>();
  sortBy = input.required<SortBy>();
  sortOrder = input.required<SortOrder>();
  sortByOptions=  input.required<SortBy[]>();
  sortOrderOptions =  input.required<SortOrder[]>();

  selectRoute = output<number>();
  selectSortBy = output<SortBy>();
  selectSortOrder = output<SortOrder>()

  onRouteChange = (event: MatSelectChange) => this.selectRoute.emit(event.value);
  onSortByChange = (event: MatRadioChange) => this.selectSortBy.emit(event.value)
  onSortOrderChange = (event: MatRadioChange) => this.selectSortBy.emit(event.value)

}
