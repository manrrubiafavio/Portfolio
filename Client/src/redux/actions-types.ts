export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

export interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE;
    payload: boolean;
}

export interface RootState {
    language: boolean;
    
}
