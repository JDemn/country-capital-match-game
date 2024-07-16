import { createSlice } from '@reduxjs/toolkit';

export const dataSlide = createSlice({
    name : "data",
    initialState : {
        status : 'initial', 
        data : {},
        errorMsg : ''        
    },
    reducers: {
        getting: (state) => {
            state.status = 'getting';            
        },
        getData: (state, { payload }) => {
          state.status = 'success';
          state.data = payload; 
        },
        failure: (state, { payload }) => {
            state.status = 'failure';            
            state.data = {};
            state.errorMsg = payload;
        },
    },
});

export const { getData, failure , getting} = dataSlide.actions;