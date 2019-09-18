import {FETCH_POSTS, NEW_POST} from '../actions/types'

const initialState = {
  items: [],
  item: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.postData
      }
    case NEW_POST:
      return {
        ...state,
        item: action.postData
      }

    default:
      return state
  }
}
