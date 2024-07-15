import { createSlice } from '@reduxjs/toolkit';

export const isClickedSlide = createSlice({
    name : "clicked",
    initialState : {
        status : 'initial', 
        wasClicked : false,        
    },
    reducers: {
        setClicked: (state) => {
          state.status = 'clicked';
          state.wasClicked = true;
        },
        setOff: (state) => {
            state.status = 'Off';            
            state.wasClicked = false;
        },
    },
});

export const { setClicked , setOff} = isClickedSlide.actions;