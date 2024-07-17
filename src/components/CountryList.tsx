import { useEffect } from "react"
import { Card, CardContent, Grid, Typography, Button, Alert } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"

import { useMatchGame } from "../customHooks/useMatchGame"
import { getFakeData } from "../store/thunk"
import { TypographyAtom } from "../atoms/TypographyAtom";
import { SnackAtom } from "../atoms/SnackAtom";
import { Item } from "../atoms/Item"
import { CountryCard } from "./CountryCard"
import { ContentCard } from "./ContentCard"

export const CountryList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { status, data, errorMsg } = useSelector(
        (state: RootState) => state.getData
    )

    const {
        handleClick,
        handleRestart,
        gameOver,
        matches,
        errors,
        matchesList,
        unmachedList,
        selectionOne,
        selectionTwo,
        disableClick,
    } = useMatchGame()
    
    useEffect(() => {
        if (Object.entries(data).length === 0) {
            dispatch(getFakeData());
        }
        if (gameOver) {
            alert("You lost");
        }

        if (matches === Object.keys(data).length && !gameOver && status !== 'failure') {
            alert("You won!");
        }

    }, [data, dispatch, matches, gameOver])

    return (
        <>
            <Grid container spacing={2}>
                {status === 'success' ? (
                    Object.entries(data).map(([country, capital]) => (
                        <Grid key={country} item xs={12} sm={6} md={4} lg={3}>
                            <CountryCard
                                styles={{
                                    backgroundColor: matchesList && matchesList[country] ? '#00FF00' :
                                        unmachedList && unmachedList[country] ? '#FF0000' :
                                            (selectionOne === country || selectionTwo === capital || selectionOne === capital || selectionTwo === country) ? '#0000FF' : 'white',
                                    cursor: !disableClick && !gameOver ? 'pointer' : 'default',
                                    pointerEvents: gameOver ? 'none' : 'auto',
                                    marginTop: '18px'
                                }}
                                event={handleClick}
                                value={country}
                            >
                                <ContentCard>
                                    <TypographyAtom styles={{
                                        color: unmachedList && unmachedList[country] ? 'white' :
                                            matchesList && matchesList[country] ? 'white' :
                                                (selectionOne === country || selectionTwo === capital || selectionOne === capital || selectionTwo === country) ? 'white' : 'black'
                                    }}>
                                        <Item name={country} />
                                    </TypographyAtom>
                                </ContentCard>
                            </CountryCard>
                            <CountryCard
                                styles={{
                                    backgroundColor: matchesList && Object.values(matchesList).includes(capital as string) ? '#00FF00' :
                                        unmachedList && Object.values(unmachedList).includes(capital as string) ? '#FF0000' :
                                            (selectionTwo === capital || selectionTwo === country) ? '#0000FF' : 'white',
                                    cursor: !disableClick && !gameOver ? 'pointer' : 'default',
                                    marginTop: '12px',
                                    pointerEvents: gameOver ? 'none' : 'auto'
                                }}
                                event={handleClick}
                                value={capital as string}
                            >
                                <ContentCard>
                                    <TypographyAtom
                                        styles={
                                            {
                                                color: unmachedList && Object.values(unmachedList).includes(capital as string) ? 'white' :
                                                    matchesList && Object.values(matchesList).includes(capital as string) ? 'white' :
                                                        (selectionTwo === capital || selectionTwo === country) ? 'white' : 'black'
                                            }
                                        }
                                    >
                                        <Item name={capital as string} />
                                    </TypographyAtom>
                                </ContentCard>
                            </CountryCard>
                        </Grid>
                    ))
                ) : (
                    <SnackAtom
                        isOpen={true}
                        duration={6000}
                        closed={() => { }}
                    >
                        <Alert severity="error" sx={{ width: '100%' }}>
                            No data available
                        </Alert>
                    </SnackAtom>
                )}
            </Grid>

            <Typography
                variant="h3"
                sx={{
                    marginBottom: '24px',
                    marginTop: '28px',
                    fontWeigth: 100,
                    color: 'red',
                    marginLeft: '40px'
                }} >
                Errors : {errors}
            </Typography>
            <Button
                onClick={handleRestart}
                variant="contained"
                color="primary"
                sx={{ marginLeft: '20px' }}
            >
                Reset
            </Button>
        </>
    );

}