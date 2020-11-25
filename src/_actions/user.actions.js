import { userConstants } from '../_constants';
// export default userActions = {
//     addNotes
// };

export function addNotes(notes) {
    return {
        type: userConstants.ADD_NOTES,
        payload: notes
    };
}

export function deleteNotes(notes) {
    return {
        type: userConstants.DELETE_NOTES,
        payload: notes
    };
}

export function updateNotes(notes) {
    return {
        type: userConstants.UPDATE_NOTES,
        payload: notes
    };
}
