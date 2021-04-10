/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * A blueprint that enforces a type and a payload to be stored
 */
export interface Action {
  /**
   * a string to identify the type of the action
   */
  type: string;
  /**
   * the information to be stored
   */
  payload: any;
}
