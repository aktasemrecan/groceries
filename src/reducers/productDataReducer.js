const initialState = {
    products: {}
}

const productDataReducer = (state = initialState,action) =>{
    switch(action.type){
        case "PRODUCT_DATA":
            return {...state, products: action.payload};
        default:
            return state;
    }
} 

export default productDataReducer;