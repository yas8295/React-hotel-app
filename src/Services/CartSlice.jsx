import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    status: false,
    pizzas: [],
    price: 0,
  },
  reducers: {
    addPizza(state, action) {
      state.status = true;
      state.pizzas.push(action.payload);
      state.price = state.pizzas
        .slice()
        .map((pizza) => pizza.unitPrice)
        .reduce((acc, cur) => acc + cur);
    },
    removePizza(state, action) {
      const index = state.pizzas.findIndex((p) => p.id === action.payload);
      state.pizzas.splice(index, 1);
      state.price = !state.pizzas.length
        ? 0
        : state.pizzas
            .slice()
            .map((pizza) => pizza.unitPrice)
            .reduce((acc, cur) => acc + cur);
      if (!state.pizzas.length) state.status = false;
    },
    deletePizza(state, action) {
      state.pizzas = state.pizzas.filter((p) => p.id !== action.payload);
      state.price = !state.pizzas.length
        ? 0
        : state.pizzas
            .slice()
            .map((pizza) => pizza.unitPrice)
            .reduce((acc, cur) => acc + cur);
      if (!state.pizzas.length) state.status = false;
    },
    clearCart(state) {
      state.status = false;
      state.pizzas = [];
      state.price = 0;
    },
  },
});

export const { addPizza, removePizza, deletePizza, clearCart } =
  CartSlice.actions;

export default CartSlice.reducer;
