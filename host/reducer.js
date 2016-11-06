import { createReducer } from 'redux-act'
import { combineReducers } from 'redux'
import concatenateReducers from 'redux-concatenate-reducers'

import { addLine, editLine, deleteLine, resetLines, redirect } from './actions'

const linesReducer = createReducer({
  [resetLines]: (state, payload) => [{id: "0", text: ""}, {id: "1", text: ""}],
  [addLine]: (state, payload) => {
    const newLines = [].concat(state)
    newLines.push({id: payload, text: ""})
    return newLines
  },
  [editLine]: (state, { index, text }) => {
    const newLines = [].concat(state)
    newLines[index].text = text
    return newLines
  },
  [deleteLine]: (state, payload) => {
    const newLines = [].concat(state)
    newLines.splice(payload, 1)
    return newLines
  },
  [redirect]: (state, payload) => {
    const newLines = [].concat(state)
    if (state.length != 2) newLines.shift()
    else {
      newLines[0].text = newLines[1].text
      newLines[1].text = ""
    }

    return newLines
  }
}, [{id: "0", text: ""}, {id: "1", text: ""}])

const lines = (state={lines: undefined}, action) => ({lines: linesReducer(state.lines, action)})

const reducer = createReducer({
  'update contents': (state, payload) => payload
}, {experiments: []})

export default concatenateReducers([lines, reducer])
