import { DataModule } from '@ab/data';
import {
  ENVIRONMENT,
  ErrorHandlerService,
  GlobalModule,
  TrackerStore,
} from '@ab/global';
import { LayoutModule } from '@ab/layout';
import { SearchBoxModule } from '@ab/search-box';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
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
  constructor(store: TrackerStore) {
    store.selectActions$().subscribe((action) => console.log(action.payload));
    store.trackSystem('STARTING', 'www', 0);
  }
}
