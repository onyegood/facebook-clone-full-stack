import Cookies from 'js-cookie';
/**
 * @user
 * Get user from the cookie if it exists
 */
const user = Cookies.get('user');

export function userReducer(
  state = user ? JSON.parse(user) : null,
  action: any
) {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    default:
      return state;
  }
}
