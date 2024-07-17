import { Card } from "@mui/material";
import { CARD_INTERFACE } from "../interfaces/interfaces";
import { useMatchGame } from "../customHooks/useMatchGame";

export const CountryCard = ({ children, styles, event ,value }: CARD_INTERFACE) => {

    return (
        <Card
            sx={styles}
            onClick={() => event(value)}
        >
            {children}
        </Card>
    );
}