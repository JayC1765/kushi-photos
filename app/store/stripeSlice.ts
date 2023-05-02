import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface StripeState {
  clientSecret: string;
  paymentIntentID: string;
}

const initialState: StripeState = {
  clientSecret: "",
  paymentIntentID: "",
};

//TODO: potentially break out certain reducers into their own slice
export const stripeSlice = createSlice({
  name: "stripe",
  initialState,
  reducers: {
    setPaymentIntent: (state, action: PayloadAction<string>) => {
      state.paymentIntentID = action.payload;
    },
    setClientSecret: (state, action: PayloadAction<string>) => {
      state.clientSecret = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPaymentIntent, setClientSecret } = stripeSlice.actions;

export default stripeSlice.reducer;
