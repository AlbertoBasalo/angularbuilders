import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Action } from './models/action';
import { Reducer } from './models/reducer';
/**
 * Holds a private observable state
 *
 *
 * @typeParam T - Type of the stored stated
 *
 */
export class Store<T> {
  private _state$: BehaviorSubject<T>;
  private _actions$: BehaviorSubject<Action>;

  /**
   * Creates a new store
   *
   * @param initialState - The initial value for this store
   *
   */
  constructor(initialState: T) {
    this._state$ = new BehaviorSubject(this.clone(initialState));
    this._actions$ = new BehaviorSubject({
      type: 'INIT',
      payload: initialState,
    });
  }

  /**
   * Gets a snapshot of the current state
   * @returns a clone of the state
   */
  getState(): T {
    return this.clone(this._state$.value);
  }
  /**
   * Gets an observable of the state changes
   * @returns a typed observable
   */
  getState$(): Observable<T> {
    return this._state$.asObservable().pipe(map((state) => this.clone(state)));
  }
  /**
   * Selects a value calculated from the state, and emits all of its changes
   * @param selector A projection or map function
   * @returns A typed observable with the changes
   */
  select$(selector: (state: T) => unknown): Observable<unknown> {
    return this.getState$().pipe(map(selector), distinctUntilChanged());
  }
  /**
   * Useful for monitoring the actions dispatched
   * @returns An observable emitting all the processed actions
   */
  getActions$(): Observable<Action> {
    return this._actions$
      .asObservable()
      .pipe(map((action) => ({ type: action.type, payload: action.payload })));
  }
  /**
   * The simplest shortcut to assign a new value
   * @param payload the new value to be stored and emitted
   * @remarks The payload will be merged with current state
   */
  setState(payload: Partial<T>): void {
    this.dispatch({ type: 'SET_STATE', payload: payload });
  }
  /**
   * The canonical and monitored way of changing the state
   * @param action an action instance witha tyype and a payload
   * @remarks The payload must be a partial of T
   */
  dispatch(action: Action): void {
    const currentState = this.getState();
    const payload = action.payload as Partial<T>;
    const newState: T = { ...currentState, ...payload };
    this.next(action, newState);
  }
  /**
   * The canonical and monitored way of changing the state
   * @param action an action instance
   * @param reducer a pure function that produces a new state based on the action payload
   * @remarks The actions payload could be anything
   */
  reduce(action: Action, reducer: Reducer<T>) {
    const currentState = this.getState();
    const newState = reducer(currentState, action.payload);
    this.next(action, newState);
  }

  private next(action: Action, newState: T) {
    this._state$.next(newState);
    this._actions$.next(action);
  }

  private clone(source: T) {
    return { ...source };
  }
}
