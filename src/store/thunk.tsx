import { AppDispatch } from "./store";
import { getting, failure, getData } from './slides'
import { getFakeDataProvider } from "./provider/getFakeDataProvider";
export const getFakeData =()=>{
    return async (dispatch: AppDispatch) => {
        dispatch({
            type : getting.type
        })
        try {
            const { ok, countriesAndCapitals, error } = await getFakeDataProvider();

            if (ok) {
                dispatch({
                    type: getData.type,
                    payload: countriesAndCapitals
                });
            } else {
                dispatch({
                    type: failure.type,
                    payload : error
                });
            }
        } catch (error) {
            console.error('Error in getFakeData thunk:', error);
            dispatch({
                type: failure.type
            });
        }
        
      }
} 