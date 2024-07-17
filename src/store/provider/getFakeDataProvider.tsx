import { config } from '../../config';
import { stagingController }  from '../../utils/stagingController'
/**
 * @description get countries data from free api
 * @return {Object} countries data or error message
 */

let host = stagingController();
export const getFakeDataProvider = async () =>{
    try {
        const response = await fetch(`${(host?.localhost)? config?.REACT_APP_COUNTRIES_APP : config?.REACT_APP_PRODUCTIONSERVER}/v3.1/all`);
        const countriesData = await response.json();
        
        const countriesAndCapitals = countriesData.slice(5, 15).reduce((acc: { [country: string]: string }, country: any) => {
            const capital = Array.isArray(country.capital) && country.capital.length > 0 ? country.capital[0] : 'Unknown';
            acc[country.name.common] = capital;
            return acc;
        }, {});

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