import {patchState, signalStore, withState, withHooks, withMethods, withComputed} from '@ngrx/signals';
import {pipe, switchMap, tap} from "rxjs";
import {computed, inject} from "@angular/core";
import {ApiService} from "../services/api.service";
import {SeaRoute} from "../models/sea-route";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {tapResponse} from '@ngrx/operators';
import {NavigationLineSettingsModel} from "@syncfusion/ej2-maps/src/maps/model/base-model";
import {MarkerSettingsModel} from "@syncfusion/ej2-angular-maps";
import {Colors} from "../models/colors";

type SeaRootsStore = {
  isLoading: boolean,
  selectedRoute: SeaRoute | undefined,
  routes: SeaRoute[],
  error: Error | undefined,
}

const initialState: SeaRootsStore = {
  isLoading: false,
  selectedRoute: undefined,
  routes: [],
  error: undefined
}

export const SeaRoutesStore = signalStore(
  withState(initialState),
  withComputed(({routes, selectedRoute}) => ({
    routesSelectOptions: computed(() => routes().map(route => (
      {id: route.id, from: route.fromPort, to: route.toPort}
    ))),
    navigationLine: computed(() => {
      if (!selectedRoute()) return [];

      const navigationLineSettings: NavigationLineSettingsModel[] = [];
      selectedRoute()!.points.forEach((point, index) => {
        if (index + 1 < selectedRoute()!.points.length) {
          navigationLineSettings.push({
            latitude: [point.latitude, selectedRoute()!.points[index + 1].latitude],
            longitude: [point.longitude, selectedRoute()!.points[index + 1].longitude],
            visible: true,
            color: Colors.black,
            width: 2
          });
        }
      });
      return navigationLineSettings;
    }),
    markers: computed(() => {
      if (!selectedRoute()) return [];

      const dataSource =  [
        {
          latitude: selectedRoute()!.points[0].latitude,
          longitude: selectedRoute()!.points[0].longitude,
          name: selectedRoute()!.fromPort
        },
        {
          latitude: selectedRoute()!.points[selectedRoute()!.points.length -1].latitude,
          longitude: selectedRoute()!.points[selectedRoute()!.points.length -1].longitude,
          name: selectedRoute()!.toPort
        },
      ]

      const markerSettings: MarkerSettingsModel[] = [{
        visible: true,
        shape: 'Balloon',
        fill: Colors.black,
        width: 20,
        height: 20,
        animationDuration: 0,
        dataSource,
      }, {
        visible: true,
        dataSource: [dataSource[0]],
        offset: {
          x: 0,
          y: -30,
        },
        template: '<div>'+ dataSource[0].name +'</div>',
      },
        {
          visible: true,
          dataSource: [dataSource[1]],
          offset: {
            x: 0,
            y: -30,
          },
          template: '<div>'+ dataSource[1].name +'</div>',
        }];

      return markerSettings;
    })
  })),
  withMethods((store, api = inject(ApiService)) => ({
    setSelectedRouteId(id: number) {
      patchState(store, {selectedRoute: store.routes().find(route => route.id === id)})
    },
    loadSeaRoots: rxMethod<void>(
      pipe(
        tap(() => patchState(store, {isLoading: true})),
        switchMap(() => api.getSeaRoutes().pipe(
          tapResponse({
            next: routes => patchState(store, {routes, isLoading: false}),
            error: (error: Error) => patchState(store, {error, isLoading: false})
          })
        ))
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadSeaRoots();
    }
  })
)
