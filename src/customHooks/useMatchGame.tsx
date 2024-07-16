import { useEffect, useState } from "react";
import { countriesAndCapitals } from "../db/db";
import { CountriesType, MachesList } from "../types/types";
import { useDispatch , useSelector} from 'react-redux';
import { AppDispatch, RootState } from "../store/store";
import { getFakeData } from "../store/thunk";
import { MatchGameProps } from "../interfaces/interfaces";

export const useMatchGame =()=>{
    const dispatch = useDispatch<AppDispatch>();
    const data : CountriesType  = useSelector(
        (state: RootState) => state.getData.data 
    )
    const [matches, setMatches] = useState<number>(0);
    const [errors, setErrors] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [matchesList, setMachesList] = useState<MachesList>({})
    const [unmachedList, setUnMachedList] = useState<CountriesType>({})
    
    useEffect(()=>{
        if (Object.entries(data).length === 0) {
            dispatch(getFakeData());
        }
    },[data, dispatch]);

    const findCapital = (valOne: string, valTwo: string|null) => {
        if (!valOne || !valTwo) return;

        let country: string | undefined;
        let capital: string | undefined;
        if (data[valOne]) {
            country = valOne;
            capital = valTwo!;
        } else if (data[valTwo!]) {
            country = valTwo!;
            capital = valOne;
        } 
        if(typeof country !== 'string' || typeof capital !== 'string') {
            console.error('Ningún valor es válido como país');
            return;
        }
        
        if (data[country] === capital) {
            setMatches(( prevMatches : number) => prevMatches + 1);
            setMachesList((prevMatchesList : MachesList) => ({
                ...prevMatchesList,
                [country as string]: capital!
            }));
            console.log("maches list",matchesList)
        } else {
            setErrors((prevErrors : number) => {                
                const newErrors = prevErrors + 1;
                if (newErrors === 3) {
                    setGameOver(true);
                }
                return newErrors;
            });
            setUnMachedList(( prevList : CountriesType) =>({
                ...prevList,
                [country as string]: capital!
            }))
            console.log("Un mached",unmachedList)
        }
    };
    const handleRestart = () => {
        setErrors(0);
        setMatches(0);
        setGameOver(false);
        setMachesList({});
        setUnMachedList({});
    };
    return{
        findCapital,
        handleRestart,
        matches,
        errors,
        gameOver,
        matchesList,
        unmachedList
    }
}