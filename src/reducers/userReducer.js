const initialState = {
  user: {},
  userData: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      return { ...state, user: action.payload };
    case "USER_DATA":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default userReducer;
