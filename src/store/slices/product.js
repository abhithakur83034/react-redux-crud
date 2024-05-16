import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products :[],
    cartProduct:[]
}
const product = createSlice({
    name:"products",
    initialState:initialState,
    reducers:{
        createProduct:(state,action)=>{
          state.products.push(action.payload);
        },
        addToCart:(state,action)=>{
            console.log(action.payload);
            let pName = action.payload.proName;
            console.log(pName);
            const productExists = state.cartProduct.find(
                (product) => product.proName === pName
            );
            console.log(productExists);

            if (productExists) {
                window.alert('This product is already in your cart!');
            } else {
                state.cartProduct.push(action.payload);
            }
        },
        increment:(state,action)=>{
            const index = action.payload;
            console.log("cartPro",state);
            if (state.cartProduct[index]) {
                state.cartProduct[index].quantity += 1;
            }
        },
        decrement:(state,action)=>{
            console.log(action.payload);
            const index = action.payload;
            console.log(index);
            if (state.cartProduct[index]) {
                if(state.cartProduct[index].quantity > 1){
                    state.cartProduct[index].quantity -= 1;
                }else{
                    state.cartProduct.splice(index,1)
                }
            }
        },
        removeProduct:(state,action)=>{
            const index = action.payload;
            state.products.splice(index,1)
        },
        removeFromCart:(state,action)=>{
            const index = action.payload;
            state.cartProduct.splice(index,1)
        },
    }
});
export const {createProduct,addToCart,increment,decrement,removeFromCart,removeProduct} = product.actions
export const getpro = (state) => state.product.products;
export const getCartData = (state) => state.product.cartProduct;
export default product.reducer;