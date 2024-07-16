import { configureStore } from '@reduxjs/toolkit'
import { dataSlide, isClickedSlide } from './slides'

export const store = configureStore({
  reducer: {
    clicked : isClickedSlide.reducer,
    getData : dataSlide.reducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch