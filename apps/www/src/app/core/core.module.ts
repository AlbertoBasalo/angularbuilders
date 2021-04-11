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
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
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
    tracker: TrackerStore
  ) {
    if (isPlatformBrowser(platformId)) {
      analytics.configure(environment.ga);
      tracker.selectNavBusiness$().subscribe({
        next: (trackEntry) => analytics.sendNav(trackEntry.label || ''),
      });
      tracker.selectClickBusiness$().subscribe({
        next: (trackEntry) => analytics.sendEvent(trackEntry),
      });
      router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe({
          next: (event) =>
            tracker.trackNavBusiness(
              (event as NavigationEnd).urlAfterRedirects
            ),
        });
    }
    if (environment.production === false) {
      // ToDo: Redux DevTools
      tracker.selectActions$().subscribe((action) => console.table(action));
    }
    tracker.trackSystem('APP_STARTED', JSON.stringify(environment));
  }
}
