import {patchState, signalStore, withState, withHooks, withMethods, withComputed} from '@ngrx/signals';
import {pipe, switchMap, tap} from "rxjs";
import {computed, inject} from "@angular/core";
import {ApiService} from "../services/api.service";
import {SeaRoute} from "../models/sea-route";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {tapResponse} from '@ngrx/operators';
import {NavigationLineSettingsModel} from "@syncfusion/ej2-maps/src/maps/model/base-model";

type SeaRootsStore = {
  isLoading: boolean,
  selectedRouteId: number | undefined,
  routes: SeaRoute[],
  error: Error | undefined,
}

const initialState: SeaRootsStore = {
  isLoading: false,
  selectedRouteId: undefined,
  routes: [],
  error: undefined
}

export const SeaRoutesStore = signalStore(
  withState(initialState),
  withComputed(({routes, selectedRouteId}) => ({
    routesSelectOptions: computed(() => routes().map(route => (
      {id: route.id, from: route.fromPort, to: route.toPort}
    ))),
    navigationLine: computed(() => {
      const route = routes().find(route => route.id === selectedRouteId())
      if (!route) return [];

      const navigationLineSettings: NavigationLineSettingsModel[] = [];
      route.points.forEach((point, index) => {
        if(index + 1 < route.points.length){
          navigationLineSettings.push({
            latitude: [point.latitude, route.points[index + 1].latitude],
            longitude: [point.longitude, route.points[index + 1].longitude],
            visible: true,
            color: 'red',
            width: 2
          });
        }
      })

      return navigationLineSettings;
    })
  })),
  withMethods((store, api = inject(ApiService)) => ({
    setSelectedRouteId(id: number) {
      patchState(store, {selectedRouteId: id})
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
