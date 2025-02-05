
import { MouseEventHandler, ReactElement, ReactNode } from 'react';
import { SxProps } from '@mui/material';
import { CountriesType, MachesList } from '../types/types'
export interface ITEM_CHILD_ELEMENT {
    name : string
}
export interface GRID_CONTAINER {
    key: string,
    xs : number,
    sm : number,
    md : number,
    mg : number,
    lg : 3
}
export interface MatchGameProps {
    findCapital: (country: string, capital: string | null) => void;
    handleRestart: () => void;
    matches: number;
    errors: number;
    gameOver: boolean;
    matchesList: { [country: string]: string };
    unmatchedList: { [country: string]: string };
}

export interface TYPOGRAPHY_STYLES {
    styles : SxProps,
    children : ReactNode
}
export interface SNACKBAR_MATERIAL {
    isOpen : boolean,
    closed : ()=> void,
    duration : number,
    children : ReactElement<any, any> | undefined
}

export interface CARD_INTERFACE {
    styles : SxProps,
    children : ReactNode
    event : ( value : string )=> void,
    value: string;
}

export type CONTENT_CARD = Omit<CARD_INTERFACE, 'event'|'styles'|'value'>;