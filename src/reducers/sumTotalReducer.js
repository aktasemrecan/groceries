const sumTotalReducer = (state= 0,action)=>{
    switch(action.type){
        case "SUM_TOTAL":
            return state+action.payload;
        default:
            return state;
    }
};

export default sumTotalReducer;