import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkIsEmpty, checkLength, calculateAge } from "./helper";
import axios from "axios";

interface FormDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
} 
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async(formDetails: any) => {
    const request = await axios.post(`http://localhost:3000/api/register`, formDetails);
    const response = await request.data;
    return response;
  }
)

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                dob: new Date().toISOString()
            },
            formstate: {
              isError: false,
              errMessage: '',
            },
            loading: false,
    },
    reducers: {
       handleInputChange: ( state: any,actions: PayloadAction<{ key: string, value: string }>) =>{
         const { key, value } = actions.payload;
         state.user[key] = value;
       },
       handleSubmit: (state) => {
          console.log("state value: ",state);
          const { firstName, lastName, email, password, confirmPassword, dob } = state.user;

          //check is all input is empty 
          const isEmptyIsExists = Object.values(state);

          if(!isEmptyIsExists){
            state.formstate = {
              isError: true,
              errMessage: 'please enter all inputs'
            }
            return 
          }

          if(checkIsEmpty(firstName)){
            state.formstate = {
              isError: true,
              errMessage: 'Please enter valid first Name',
            }
            return;
          }

          if(checkIsEmpty(lastName)){
            state.formstate = {
              isError: true,
              errMessage: 'Please enter valid last Name',
            }
            return;
          }

          if(checkIsEmpty(email)){
            state.formstate = {
              isError: true,
              errMessage: 'Please enter valid email',
            }
            return;
          }

          if(checkIsEmpty(password)){
            state.formstate = {
              isError: true,
              errMessage: 'Please enter valid password',
            }
            return;
          }

          if(checkIsEmpty(confirmPassword)){
            state.formstate = {
              isError: true,
              errMessage: 'Please enter valid confirm password',
            }
            return;
          }

          if(password !== confirmPassword){
            state.formstate = {
              isError: true,
              errMessage: 'Please enter valid confirm password',
            }
            return;
          }



        if(firstName && !checkLength(firstName)){
          state.formstate = {
            isError: true,
            errMessage: 'first name should be min 5 and max 50',
          }
          return;
      }

      if(lastName && !checkLength(lastName)){
          state.formstate = {
             isError: true,
             errMessage: "lastName name should be min 5 and max 50"
            };
          return;
         
      }

      if(password && !checkLength(password, 8)){
         state.formstate = { 
          isError: true, 
          errMessage: "password should minimunm 8 "
        };
        return;
      }

      if(!dob ){
          state.formstate = { 
            isError: true,
            errMessage: "Please enter date of birth"
          };
          return;
      }

      if(dob && calculateAge(dob) < 18){
          state.formstate = { isError: true, errMessage: "18 years olders are allowed"};
          return;
      }
      state.formstate = {
        isError: false,
        errMessage: '',
      };
       },

       extraReducers: (builder: any) => {
        console.log("extra reducer called....", builder);
          builder.addCase(registerUser.pending, (state:any) => {
            state.loading = true;
            state.formstate ={ isError: false, errMessage: ''}; 
          })
          .addCase(registerUser.fulfilled, (state:any) => {
            state.loading = false;
            state.formstate ={ isError: false, errMessage: ''}; 
          })
          .addCase(registerUser.rejected, (state:any, action:any) => {
            state.loading = false;
            if(action.error.message){
              state.value.formstate = {
                isError: true,
                errMessage: action.error.message
              }
            }
          })

       }
  }
});
    

export const { handleInputChange, handleSubmit } = registerSlice.actions;
export default registerSlice.reducer
