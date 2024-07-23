import {MarkerSettingsModel} from "@syncfusion/ej2-angular-maps";
import {Colors} from "../models/colors";
import {DataSource} from "../models/data-source";

export const getMarkers = (dataSource: DataSource[]): MarkerSettingsModel[] => [{
  visible: true,
  shape: 'Balloon',
  fill: Colors.black,
  width: 40,
  height: 40,
  animationDuration: 0,
  dataSource,
}, ...dataSource.map(item => ({
  visible: true,
  dataSource: [item],
  offset: {
    x: 0,
    y: -50,
  },
  template: getMarkerTemplate(item.name),
}))]

export const getMarkerTemplate = (name: string): string => `<div>${name}</div>`;

export const getColor = (speed: number): Colors => {
  if (speed === 0) return Colors.black;
  if (speed < 5) return Colors.red;
  if (speed < 10) return Colors.yellow;
  return Colors.green;
}
