import { Action, ActionState, ActionType } from "./actions";

const initialState = {
  photo: undefined,
  album: undefined,
  photos: [],
  albums: []
};

export default function Reducer(
  state: ActionState = initialState,
  action: Action
) {
  switch (action.type) {
    case ActionType.OPEN_PHOTO:
      return {
        ...state,
        photo: action.payload
      };
    case ActionType.OPEN_ALBUM:
      return {
        ...state,
        album: action.payload
      };
    case ActionType.GET_PHOTOS:
      return {
        ...state,
        photos: action.payload
      };
    case ActionType.GET_ALBUMS:
      return {
        ...state,
        albums: action.payload
      };
    default:
      return state;
  }
}
