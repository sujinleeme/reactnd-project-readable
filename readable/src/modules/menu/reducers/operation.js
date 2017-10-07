import { LOCATION_CHANGE } from 'react-router-redux';

export default function operation(state = "", action) {
  if (action.type === 'SET_OPERATION') {
    return action.name;
  }
  
  // Now there's a LOCATION_CHANGE action we can set the operation
  // from the URL when the history changes (eg first page load, back
  // button etc.)
  if (action.type === 'LOCATION_CHANGE') {
    const pathname = action.payload.pathname;
    // /redux-history-demo/:operation
    const [_, category = ""] = pathname.split('/');
    return operation;
  }
  
  return state;
}
