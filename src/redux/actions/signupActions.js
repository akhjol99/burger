import axios from "axios";
export const signupUser = (email, password) => {
    return function(dispatch){
        dispatch(signupUserStart());
        const data = {
            email, 
            password, 
            returnSecureToken:true

        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAe41OgISseUI7sEhREYKLmB4exNA8yA6o', data).then(result => {
            const token = result.data.idToken;
            const userId = result.data.localId;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            dispatch(signupUserSuccess(token, userId));

        }).catch(er => {
            dispatch(signupUserError(er));

        })
       
    };
  };
export const signupUserStart = () => {
    return {
      type: "SIGNUP_USER_START"
    };
};
export const signupUserSuccess = (token, userId) => {
    return {
      type: "SIGNUP_USER_SUCCESS",
      token,
      userId
    };
  };
export const signupUserError = error => {
    return {
      type: "SIGNUP_USER_ERROR",
      error
    };
};

export const logout = () =>{
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('refreshToken');
  return {
    type: "LOG_OUT"
  }
}

export const autoLogoutAfterMills = (ms) => {
  return function(dispatch) {
    setTimeout(()=>{
      dispatch(logout())
    }, ms)
  }
}