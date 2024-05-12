import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState={
    productList:[],
    cartItem:[],
    initialCart:[]
};
export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setProductData:(state,action)=>{
            state.productList=[...action.payload]
        },
        addCartItem:(state,action)=>{
            const check = state.cartItem.some((e)=>e._id===action.payload._id);
            if(check)
            {
                toast("Item already exists in cart");
            }
            else{
                toast("Item added to cart");
                const total = action.payload.price;
                state.cartItem = [...state.cartItem,{...action.payload,qty:1,total:total}];
            }
        },
        deleteCartItem:(state,action)=>{
            const index = state.cartItem.findIndex((el)=>el._id===action.payload);
            state.cartItem.splice(index,1);
            toast("One Item deleted");
        },
        deleteAllCartItem:(state,action)=>{
            state.cartItem=[];
        },
        increaseQty:(state,action)=>{
            const index = state.cartItem.findIndex((el)=>el._id===action.payload);
            let qty = state.cartItem[index].qty;
            let total = state.cartItem[index].total;
            let price = state.cartItem[index].price;
            state.cartItem[index].qty=++qty;
            state.cartItem[index].total = parseInt(price) + parseInt(total);
        },
        initialCart:(state,action)=>{
            state.initialCart=(action.payload);
            state.cartItem=state.initialCart;
        },
        decreaseQty:(state,action)=>{
            const index = state.cartItem.findIndex((el)=>el._id===action.payload);
            let qty = state.cartItem[index].qty;
            if(qty>1)
            {
                let total = state.cartItem[index].total;
                let price = state.cartItem[index].price;
                state.cartItem[index].qty=--qty;
                state.cartItem[index].total = parseInt(total) - parseInt(price);
            }
        }
    }
})
export const {setProductData,addCartItem,deleteCartItem,increaseQty,decreaseQty,deleteAllCartItem,initialCart} = productSlice.actions;
export default productSlice.reducer;