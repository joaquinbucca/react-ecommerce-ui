// @flow

import {combineReducers} from 'redux'
import type {ECommerceAction, ECommerceState} from './types'

import * as textAreaPanel from './components/textarea-panel'
import * as ramlModel from './components/raml-model'
import * as selectedElements from './components/selected-elements'

const VisualDesignerName = 'visualDesigner'

const rootReducer: (ECommerceState, ECommerceAction) => ECommerceState = combineReducers({
  [VisualDesignerName]: combineReducers({
    [textAreaPanel.Name]: textAreaPanel.reducer,
    [ramlModel.Name]: ramlModel.reducer,
    [selectedElements.Name]: selectedElements.reducer,
  })
})


export {rootReducer}