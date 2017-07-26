// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import './index.scss'
import {applyMiddleware, createStore} from 'redux'
import {rootReducer} from './component'
import {Provider} from 'react-redux'
import type {ExtraArgs} from './types'

const extraArgs: ExtraArgs = {
  // converter: new NewConverter(Formats.RAML, Formats.RAML)
}

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(extraArgs)))

ReactDOM.render(
  <Provider store={store}>
    <div />
  </Provider>,
  document.getElementById('root')
)