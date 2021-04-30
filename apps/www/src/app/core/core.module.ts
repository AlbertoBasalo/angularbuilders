import { DataModule } from '@ab/data';
import {
  AnalyticsService,
  Environment,
  ENVIRONMENT,
  ErrorHandlerService,
  GlobalModule,
  TrackerStore,
} from '@ab/global';
import { LayoutModule } from '@ab/layout';
import { SearchBoxModule } from '@ab/search-box';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CoreRoutingModule } from './core-routing.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    DataModule,
    GlobalModule,
    HttpClientModule,
    LayoutModule,
    SearchBoxModule,
  ],
  exports: [LayoutModule, LayoutComponent],
})
export class CoreModule {
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(ENVIRONMENT) private readonly environment: Environment,
    router: Router,
    analytics: AnalyticsService,
    tracker: TrackerStore,
    activatedRoute: ActivatedRoute,
    titleService: Title
  ) {
    if (isPlatformBrowser(platformId)) {
      analytics.configure(environment.ga);
      tracker.selectByEvent$('NAV').subscribe({
        next: (trackEntry) => analytics.sendNav(trackEntry.label || ''),
      });
      tracker.selectByEvent$('CLICK').subscribe({
        next: (trackEntry) => analytics.sendEvent(trackEntry),
      });
      tracker.selectByEvent$('APP_STARTED').subscribe({
        next: (trackEntry) => analytics.sendEvent(trackEntry),
      });
      tracker.selectAnyErrors$().subscribe({
        next: (trackEntry) => analytics.sendEvent(trackEntry),
      });
      router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map((event) => event as NavigationEnd)
        )
        .subscribe({
          next: (navigationEndEvent) => {
            tracker.trackBusiness('NAV', navigationEndEvent.urlAfterRedirects);
          },
        });
      if (environment.production === false) {
        // ToDo: Use Redux DevTools
        tracker.selectActions$().subscribe((action) => console.table(action));
      }
      tracker.trackSystem('APP_STARTED', JSON.stringify(environment));
    }
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
      )
      .subscribe({
        next: () => {
          titleService.setTitle(activatedRoute.firstChild?.snapshot.data.title);
        },
      });
  }
}
