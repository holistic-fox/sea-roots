import {MarkerSettingsModel} from "@syncfusion/ej2-angular-maps";
import {Colors} from "../models/colors";
import {DataSource} from "../models/data-source";

export const getMarkers = (dataSource: DataSource[]): MarkerSettingsModel[] => [{
  visible: true,
  shape: 'Balloon',
  fill: Colors.black,
  width: 20,
  height: 20,
  animationDuration: 0,
  dataSource,
}, ...dataSource.map(item => ({
  visible: true,
  dataSource: [item],
  offset: {
    x: 0,
    y: -30,
  },
  template: getMarkerTemplate(item.name),
}))]

export const getMarkerTemplate = (name: string): string => `<div>${name}</div>`;
