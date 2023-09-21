import {
    CHANGE_LANGUAGE
} from './actions-types'

export const setLanguage = (language: boolean) => ({
    type: CHANGE_LANGUAGE,
    payload: language,
  });