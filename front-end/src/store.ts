import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./features/register";

export default configureStore({
    reducer: {
        register: registerReducer,
    },
})