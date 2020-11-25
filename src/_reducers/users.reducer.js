import { userConstants } from '../_constants';

const updatedNotes = [];
export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.ADD_NOTES:
      if (action.payload.index > -1) {
        // let updatedValue = updatedNotes.map((obj, parentIndex) => payloaddata.find((item, childIndex) => action.payload.index === parentIndex) || obj);
        updatedNotes.splice(action.payload.index, 1, action.payload.item);
      }
      else {
        updatedNotes.push(JSON.parse(JSON.stringify(action.payload.item)))
      }

      return {
        notes: updatedNotes
      }

    case userConstants.DELETE_NOTES:
      updatedNotes.splice(action.payload, 1);
      return {
        notes: updatedNotes
      }

    case userConstants.UPDATE_NOTES:
      return {
        notes: updatedNotes,
        updateNotes: action.payload
      }

    default:
      return state
  }
}