const productDetailReducer = (state = {
  product: {
    productName:null,
    imageUrl: null,
    price: null,
    quantityT: null,
    productId: null
  }
}, action) => {
  switch (action.type) {
    case "PRODUCT_DATA1":
      return { ...state, product: action.payload };
    default:
      return state;
  }
};

export default productDetailReducer;
