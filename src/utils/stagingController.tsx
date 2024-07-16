import { config } from "../config";

export const stagingController =()=>{
    try {
        let localhost;
        let production;
        let host = window.location.hostname;
        if(host.startsWith('localhost')|| host.startsWith('127.0.0.1')){
            localhost = config?.REACT_APP_COUNTRIES_APP;
            return {
                localhost
            }
        }else{
            production = config?.REACT_APP_PRODUCTIONSERVER;
            return{
                production
            }
        }
    }catch(error){
        console.log(`${error}`)
    }
}