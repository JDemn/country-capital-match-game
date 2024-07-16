import { Snackbar } from "@mui/material"
import { SNACKBAR_MATERIAL } from "../interfaces/interfaces"

export const SnackAtom =({ isOpen, duration , closed , children }:SNACKBAR_MATERIAL)=>{
    return(
        <Snackbar
            open  = { isOpen }
            autoHideDuration= { duration }
            onClose= { closed }
        >
            { children }
        </Snackbar>
    )
}