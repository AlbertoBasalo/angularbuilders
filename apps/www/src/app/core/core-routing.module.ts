import { AnalyticsService, TrackerStore } from '@ab/global';
import { isPlatformBrowser } from '@angular/common';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { filter } from 'rxjs/operators';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@ab/home').then((module) => module.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('@ab/auth').then((module) => module.AuthModule),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('@ab/category').then((module) => module.CategoryModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('@ab/not-found').then((module) => module.NotFoundModule),
  },
  {
    path: 'resource',
    loadChildren: () =>
      import('@ab/resource').then((module) => module.ResourceModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('@ab/search').then((module) => module.SearchModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        ...routes,
        {
          path: '**',
          redirectTo: 'not-found',
        },
      ],
      {
        initialNavigation: 'enabled',
      }
    ),
  ],
  exports: [RouterModule],
})
export class CoreRoutingModule {
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) platformId: Object,
    router: Router,
    store: TrackerStore,
    analytics: AnalyticsService
  ) {
    if (isPlatformBrowser(platformId)) {
      analytics.activate();
      router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe({
          next: (event) =>
            store.trackNavBusiness((event as NavigationEnd).urlAfterRedirects),
        });
    }
  }
}
