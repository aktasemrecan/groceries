const searchOnReducer = (state= false,action)=>{
    switch(action.type){
        case "SEARCH_ACTIVE":
            return action.payload;
        default:
            return state;
    }
};

export default searchOnReducer;