// @flow

/**
 * ECommerceAction: union of actions types used by every component
 */
export type ECommerceAction = {}

/**
 * ECommerceState: union of state types used by every component
 */
export type ECommerceState = {
  ecommerce: {
    // textAreaPanel: TextAreaPanelState,
    // ramlModel: RamlModelState,
    // selectedElements: SelectedElementsState,
  }
}

/**
 * ExtraArgs passed to thunk action creators
 */

export type ExtraArgs = {
  // converter: NewConverter
}

/**
 * GetState function passed to thunk action creators
 */

export type GetState = () => ECommerceState

/**
 * Dispatch function used by redux in the visual designer
 */

export type PromiseAction = Promise<ECommerceAction>
// eslint-disable-next-line
export type ThunkAction<T> = (dispatch: Dispatch, getState: GetState, eA: ExtraArgs) => T
export type Action = ECommerceAction | PromiseAction | Array<ECommerceAction>
export type Dispatch = <T>(action: Action | ThunkAction<T>) => T
