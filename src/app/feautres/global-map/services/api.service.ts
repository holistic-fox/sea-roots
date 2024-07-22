import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxCsvParser} from "ngx-csv-parser";
import {map, Observable} from "rxjs";
import {SeaRoute} from "../models/sea-route";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  private ngxCsvParser = inject(NgxCsvParser);

  getSeaRoutes = (): Observable<SeaRoute[]> => this.http.get('data/sea-routes.csv', {responseType: 'text'}).pipe(
    map(response => this.ngxCsvParser.csvStringToArray(response, ',')),
    map(([_, ...data]) => data),
    map(response => response.filter(
      ([route_id, formPort, toPort, legDuration, points]) => route_id && formPort && toPort && legDuration && points)),
    map(this.parseSeaRoots)
  );

  private parseSeaRoots = (response: any[][]) => response.map(([route_id, formPort, toPort, legDuration, points]) => {
    const seaRoute: SeaRoute = {
      id: Number(route_id),
      formPort,
      toPort,
      legDuration: Number(legDuration),
      points: JSON.parse(points).map((point: [number, number, number, number]) => {
        const [longitude, latitude, timestamp, speed] = point;
        return {
          longitude,
          latitude,
          timestamp,
          speed
        }
      }),
    }
    return seaRoute;
  });

}
