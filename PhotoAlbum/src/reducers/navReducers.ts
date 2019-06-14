import {
  NavAction,
  NavActionState,
  NavActionType
} from "./navActions";

const initialState = {
  photo: undefined,
  album: undefined,
  albums: undefined,
  photos: undefined
};

export default function navReducer(
  state: NavActionState = initialState,
  action: NavAction
) {
  switch (action.type) {
    case NavActionType.NAVIGATE_TO_PHOTO:
      return {
        ...state,
        photo: action.payload
      };
      case NavActionType.OPEN_ALBUM:
      console.log(action.payload)
      return {
        ...state,
        album: action.payload
      };
      default: 
      return state
  }
}
