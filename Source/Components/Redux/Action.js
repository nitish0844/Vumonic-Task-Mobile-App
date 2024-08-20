export const setTotalEmails = totalEmails => {
  return {
    type: 'SET_TOTAL_EMAILS',
    payload: totalEmails,
  };
};

export const setError = error => {
  return {
    type: 'SET_ERROR',
    payload: error,
  };
};

export const setEmailLoading = emailLoading => {
  return {
    type: 'SET_EMAIL_LOADING',
    payload: emailLoading,
  };
};

export const setAppCode = AppCode => {
  return {
    type: 'SET_APP_CODE',
    payload: AppCode,
  };
};

export const setUserEmail = emails => {
  return {
    type: 'SET_USER_EMAIL',
    payload: emails,
  };
};
