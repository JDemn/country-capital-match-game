import { ReactNode } from "react";
import { Typography } from "@mui/material"
import { TYPOGRAPHY_STYLES } from "../interfaces/interfaces";
export const TypographyAtom =({ styles , children } : TYPOGRAPHY_STYLES)=>{

    return(
        <Typography component="div" sx={ styles}>
                { children }
        </Typography>
    );
}