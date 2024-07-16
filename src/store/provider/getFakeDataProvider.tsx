import { countriesAndCapitals } from "../../db/db"
import { CountriesType } from "../../types/types"

export const getFakeDataProvider = async () =>{
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countriesData = await response.json();
        
        const countriesAndCapitals = countriesData.slice(0, 10).reduce((acc: { [country: string]: string }, country: any) => {
            const capital = Array.isArray(country.capital) && country.capital.length > 0 ? country.capital[0] : 'Unknown';
            acc[country.name.common] = capital;
            return acc;
        }, {});

        console.log(countriesAndCapitals);
        return {
            ok: true,
            countriesAndCapitals
        };
    } catch (error) {
        console.error('Error fetching country data:', error);
        return {
            ok : false,
            error
        };
    }
}