import {createStore} from 'redux';

const initialState = {
  totalEmails: 0,
  error: '',
  emailLoading: false,
  AppCode: '',
  userEmail: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOTAL_EMAILS':
      return {
        ...state,
        totalEmails: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_EMAIL_LOADING':
      return {
        ...state,
        emailLoading: action.payload,
      };
    case 'SET_APP_CODE':
      return {
        ...state,
        AppCode: action.payload,
      };
    case 'SET_USER_EMAIL':
      return {
        ...state,
        userEmail: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
