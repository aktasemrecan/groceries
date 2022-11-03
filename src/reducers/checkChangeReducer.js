const checkChangeReducer = (state = {
  favoriteChanged: false
}, action) => {
  switch (action.type) {
    case "FAVORITE_CHANGED":
      return { ...state, favoriteChanged: !state.favoriteChanged };
    default:
      return state;
  }
};

export default checkChangeReducer;
