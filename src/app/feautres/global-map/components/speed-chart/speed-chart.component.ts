import {Component, input, OnInit} from '@angular/core';
import {AxisModel, ChartModule, LineSeriesService} from "@syncfusion/ej2-angular-charts";
import {ChartData} from "../../models/chart-data";

@Component({
  selector: 'marcura-speed-chart',
  standalone: true,
  imports: [ChartModule],
  providers: [LineSeriesService],
  templateUrl: './speed-chart.component.html',
  styleUrl: './speed-chart.component.scss'
})
export class SpeedChartComponent {

  chartData = input.required<ChartData[]>();

  title = 'Speed chart';

  primaryXAxis: AxisModel = {
    title: 'Time in minutes',
  }

  primaryYAxis: AxisModel = {
    title: 'Speed in knots',
  }
}
