import Cookies from 'js-cookie';
import { UserState } from '../../../types/user';
/**
 * @user
 * Get user from the cookie if it exists
 */
const user = Cookies.get('user');

const INITIAL_STATE: UserState = {
  user: user ? JSON.parse(user) : null,
  users: [],
};

export function userReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'VERIFY':
      return {
        ...state,
        user: { verified: action.payload },
      };
    default:
      return state;
  }
}
