import {patchState, signalStore, withState, withHooks, withMethods, withComputed} from '@ngrx/signals';
import {pipe, switchMap, tap} from "rxjs";
import {computed, inject} from "@angular/core";
import {ApiService} from "../services/api.service";
import {SeaRoute} from "../models/sea-route";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {tapResponse} from '@ngrx/operators';
import {NavigationLineSettingsModel} from "@syncfusion/ej2-maps/src/maps/model/base-model";
import {Colors} from "../models/colors";
import {getMarkers} from "../utilities/global-map.utilities";

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

      const startPoint = selectedRoute()!.points.at(0);
      const endPoint = selectedRoute()!.points.at(-1);

      const dataSource = [
        {
          latitude: startPoint!.latitude,
          longitude: startPoint!.longitude,
          name: selectedRoute()!.fromPort
        },
        {
          latitude: endPoint!.latitude,
          longitude: endPoint!.longitude,
          name: selectedRoute()!.toPort
        },
      ]

      return getMarkers(dataSource);
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
