import { Component } from '@angular/core';
import {AxisModel, ChartModule} from "@syncfusion/ej2-angular-charts";

@Component({
  selector: 'marcura-speed-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './speed-chart.component.html',
  styleUrl: './speed-chart.component.scss'
})
export class SpeedChartComponent {

  title = 'Speed chart';

  primaryXAxis: AxisModel= {
    title: 'Speed',
  }

  primaryYAxis: AxisModel ={
    title: 'Speed',
  }

  chartData = [];
}
