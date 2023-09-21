import { CHANGE_LANGUAGE, RootState } from './actions-types';
import { ChangeLanguageAction } from './actions-types';

const initialState : RootState = {
  language: true,
};

const reducer = (state = initialState, action: ChangeLanguageAction) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
