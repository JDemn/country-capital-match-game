import { useState } from "react";
/**
 * @description set true value when an item is clicked
 */
export const useIsClicked = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return {
        handleClick
    }
}