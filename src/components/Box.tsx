import { Card, CardContent, Grid, Typography, Button } from "@mui/material"

import { Item } from "../atoms/Item"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { setClicked, setOff } from "../store/slides"

import { useEffect, useState } from "react"
import { useMatchGame } from "../customHooks/useMatchGame"
import { getFakeData } from "../store/thunk"

export const Box = () => {
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
        disableClick
    } = useMatchGame()

    useEffect(() => {
        if (Object.entries(data).length === 0) {
            dispatch(getFakeData());
        }
        if (gameOver) {
            alert("You lost");
        }

        if (matches === Object.keys(data).length && !gameOver) {
            alert("You won!");
        }

    }, [data, dispatch, matches, gameOver])

    return (
        <>
            <Grid container spacing={2}>
                {Object.entries(data).map(([country, capital]) => (
                    <Grid key={country} item xs={12} sm={6} md={4} lg={3}>
                        <Card
                            sx={{
                                backgroundColor: matchesList && matchesList[country] ? '#00FF00' :
                                    unmachedList && unmachedList[country] ? '#FF0000' :
                                        (selectionOne === country || selectionTwo === capital || selectionOne === capital || selectionTwo === country) ? '#0000FF' : 'white',
                                cursor: !disableClick && !gameOver ? 'pointer' : 'default',
                                pointerEvents: gameOver ? 'none' : 'auto'
                            }}
                            onClick={() => handleClick(country)}
                        >
                            <CardContent>
                                <Typography component="div"
                                    sx={{
                                        color: unmachedList && unmachedList[country] ? 'white' :
                                            matchesList && matchesList[country] ? 'white' :
                                                (selectionOne === country || selectionTwo === capital || selectionOne === capital || selectionTwo === country) ? 'white' : 'black'
                                    }}
                                >
                                    <Item name={country} />
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card
                            sx={{
                                backgroundColor: matchesList && Object.values(matchesList).includes(capital as string) ? '#00FF00' :
                                    unmachedList && Object.values(unmachedList).includes(capital as string) ? '#FF0000' :
                                        (selectionTwo === capital || selectionTwo === country) ? '#0000FF' : 'white',
                                cursor: !disableClick && !gameOver ? 'pointer' : 'default',
                                marginTop: '12px',
                                pointerEvents: gameOver ? 'none' : 'auto'
                            }}
                            onClick={() => handleClick(capital as string)}
                        >
                            <CardContent>
                                <Typography component="div"
                                    sx={{
                                        color: unmachedList && Object.values(unmachedList).includes(capital as string) ? 'white' :
                                            matchesList && Object.values(matchesList).includes(capital as string) ? 'white' :
                                                (selectionTwo === capital || selectionTwo === country) ? 'white' : 'black'
                                    }}
                                >
                                    <Item name={capital as string} />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
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