export const UPDATE_MODE_DEFAULT = 'UPDATE_MODE_DEFAULT';
export const UPDATE_MODE_CHANGE_PASSWORD = 'UPDATE_MODE_CHANGE_PASSWORD';
export const UPDATE_MODE_EDIT_PROFILE = 'UPDATE_MODE_EDIT_PROFILE';

export const base_url = 'https://webaccounting.herokuapp.com';
export const createToken = (userName: string, password: string) => `Basic ${btoa(`${userName}:${password}`)}`