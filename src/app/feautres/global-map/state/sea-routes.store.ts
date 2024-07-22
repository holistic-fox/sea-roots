import {patchState, signalStore, withState, withHooks, withMethods, withComputed} from '@ngrx/signals';
import {pipe, switchMap, tap} from "rxjs";
import {computed, inject} from "@angular/core";
import {ApiService} from "../services/api.service";
import {SeaRoute} from "../models/sea-route";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {tapResponse} from '@ngrx/operators';

type SeaRootsStore = {
  isLoading: boolean,
  routes: SeaRoute[],
  error: Error | undefined,
}

const initialState: SeaRootsStore = {
  isLoading: false,
  routes: [],
  error: undefined
}

export const SeaRoutesStore = signalStore(
  withState(initialState),
  withComputed(({routes}) => ({
    routesSelectOptions: computed(() => routes().map(route => (
      {id: route.id, from: route.fromPort, to: route.toPort}
    )))
  })),
  withMethods((store, api = inject(ApiService)) => ({
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
