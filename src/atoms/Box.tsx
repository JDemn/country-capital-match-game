import { Card, CardContent, Grid, Typography } from "@mui/material"

import { Item } from "./Item"
import { useIsClicked } from "../customHooks/useIsClicked"
import { useDispatch} from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { setClicked, setOff } from "../store/slides"

import { countriesAndCapitals } from "../db/db"
import { useEffect, useState } from "react"
import { useMatchGame } from "../customHooks/useMatchGame"



const cardStyles = {
    minWidth: 200,
    margin: 10,
}

export const Box = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    const [selectionOne, setSelectionOne] = useState<string | null >(null);
    const [selectionTwo, setSelectionTwo] = useState<string | null>(null);
    const [disableClick, setDisableClick] = useState<boolean>(false);
    
    const { findCapital, gameOver, matches, handleRestart ,matchesList, unmachedList } = useMatchGame()


    const handleClick = ( selection: string ) => {
        if (disableClick) return;
        if ( selectionOne === null ) {
            setSelectionOne(selection);
            dispatch(setClicked());
        } else if (selectionOne !== null && selection !== selectionOne) {
            setSelectionTwo(selection);
            setDisableClick(true)
            setTimeout(() => {
                findCapital(selectionOne, selection);
                setSelectionOne(null);
                setSelectionTwo(null);
                setDisableClick(false);
                dispatch(setOff());
            }, 1000);
        } 
    };

    return (
        <div>
            {!gameOver && matches !== Object.keys(countriesAndCapitals).length && (
                <Grid container spacing={2}>
                    {Object.entries(countriesAndCapitals).map(([country, capital]) => (
                        <Grid key={country} item xs={12} sm={6} md={4} lg={3}>
                            <Card                                
                                sx={{
                                    backgroundColor: matchesList[country] ? '#00FF00' : 
                                                     unmachedList[country] ? '#FF0000' :
                                                     (selectionOne === country || selectionTwo === country) ? '#0000FF' : 'white',
                                    cursor: !disableClick ? 'pointer' : 'default'
                                }}
                                onClick={() => handleClick(country)}
                            >
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        <Item name={country} />
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card                                
                                sx={{
                                    backgroundColor: Object.values(matchesList).includes(capital) ? '#00FF00' : 
                                                     Object.values(unmachedList).includes(capital) ? '#FF0000' :
                                                     (selectionOne === capital || selectionTwo === capital) ? '#0000FF' : 'white',
                                    cursor: !disableClick ? 'pointer' : 'default',
                                    marginTop: '12px'
                                }}
                                onClick={() => handleClick(capital)}
                            >
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        <Item name={capital} />
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            {matches === Object.keys(countriesAndCapitals).length && (
                <Typography variant="h6" color="primary">¡Felicidades! Has completado todos los matches.</Typography>
            )}
            {gameOver && (
                <div>
                    <Typography variant="h6" color="error">Has cometido 3 errores. Reinicia el juego para continuar.</Typography>
                    <button onClick={handleRestart}>Reiniciar juego</button>
                </div>
            )}
        </div>
    );
}