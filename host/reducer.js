import { createReducer } from 'redux-act'
import { combineReducers } from 'redux'

import { addLine, editLine, resetLines, redirect } from './actions'

const lines = createReducer({
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
  [redirect]: (state, payload) => {
    const newLines = [].concat(state)
    newLines.shift()
    return newLines
  }
}, [{id: "0", text: ""}, {id: "1", text: ""}])

export default combineReducers({ lines })
