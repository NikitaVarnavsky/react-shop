import { TOKEN_KEY, USER_ID, FULL_NAME } from '../consts/localStorage.consts';

export function removeLocalStorage() {
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(FULL_NAME);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getUserId() {
  return localStorage.getItem(USER_ID);
}
export function getUserName() {
  return localStorage.getItem(FULL_NAME);
}

const localStorageService = {
  getToken,
  getUserId,
  getUserName,
};

export default localStorageService;
