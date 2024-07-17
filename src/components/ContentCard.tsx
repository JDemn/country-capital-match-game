import { CardContent, Typography } from "@mui/material"
import { TypographyAtom } from "../atoms/TypographyAtom";

import { CONTENT_CARD } from "../interfaces/interfaces";
export const ContentCard = ({ children }:CONTENT_CARD) => {
    return (
        <>
            <CardContent>
                { children }
            </CardContent>
        </>
    );
}