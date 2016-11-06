import { createAction } from 'redux-act'

export const openParticipantPage = createAction('open participant page')

export const addLine = createAction('add line', id => id)
export const resetLines = createAction('reset lines')
export const deleteLine = createAction('delete line', index => index)
export const editLine = createAction('edit line', (index, text) => ({ index, text }))
export const redirect = createAction('redirect')
