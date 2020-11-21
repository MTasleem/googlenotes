import { userConstants } from '../_constants';

const updatedNotes = [];
export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.ADD_NOTES:
      // deep copy
      updatedNotes.push(JSON.parse(JSON.stringify(action.payload)))
      return {
        notes: updatedNotes
      }

    case userConstants.DELETE_NOTES:
      updatedNotes.splice(action.payload, 1);
      return {
        notes: updatedNotes
      }

    default:
      return state
  }
}