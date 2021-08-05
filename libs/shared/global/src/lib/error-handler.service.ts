import { ErrorHandler, Injectable } from '@angular/core';
import { TrackerStore } from './tracker.store';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor(private store: TrackerStore) {}

  handleError(error: Error): void {
    console.log(error);
    if (!!error.name && error.name === 'HttpErrorResponse') {
      return;
    } else {
      this.store.trackCodeError(error);
    }
  }
}
