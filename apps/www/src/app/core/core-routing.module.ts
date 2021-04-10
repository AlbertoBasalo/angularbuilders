import { TrackerStore } from '@ab/global';
import { isPlatformBrowser } from '@angular/common';
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';

declare let gtag: (command: string, id: string, event: unknown) => void;

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
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    router: Router,
    private store: TrackerStore
  ) {
    if (isPlatformBrowser(platformId)) {
      router.events.subscribe((event: unknown) => {
        if (event instanceof NavigationEnd) {
          gtag('config', environment.ga, {
            page_path: event.urlAfterRedirects,
          });
          this.store.trackNavBusiness(event.urlAfterRedirects);
        }
      });
    }
  }
}
