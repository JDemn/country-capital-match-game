import { useState } from "react";
import { countriesAndCapitals } from "../db/db";
import { CountriesType, MachesList } from "../types/types";

export const useMatchGame =()=>{
    const [matches, setMatches] = useState<number>(0);
    const [errors, setErrors] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [matchesList, setMachesList] = useState<MachesList>({})
    const [unmachedList, setUnMachedList] = useState<CountriesType>({})
    
    const findCapital = (country: string, capital: string|null) => {
        if (countriesAndCapitals[country] === capital) {
            setMatches(prevMatches => prevMatches + 1);
            setMachesList(prevMatchesList => ({
                ...prevMatchesList,
                [country]: capital!
            }));
            console.log("maches list",matchesList)
        } else {
            setErrors(prevErrors => {                
                const newErrors = prevErrors + 1;
                if (newErrors === 3) {
                    setGameOver(true);
                }
                return newErrors;
            });
            setUnMachedList(prevList =>({
                ...prevList,
                [country]: capital!
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