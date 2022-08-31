import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useImagenToken from "../../hooks/useImagenToken";

const Home = ()=>{
    
    
    const {active, chainId, account  } = useWeb3React();
    const [ maxSupply, setMaxSupply]= useState();

    const imagenToken = useImagenToken();


    const getMaxSupply = useCallback(async()=>{
        // validamos que el contrato exista 
        if(imagenToken){
            const result = await imagenToken.methods.maxSupply().call().then(console.log);
            //console.log(imagenToken.methods);
            setMaxSupply(result);
        } 
    },imagenToken); // cada que cambie elcontrato secrea esta funcion
    
    useEffect(()=>{
        getMaxSupply();
    },[getMaxSupply]) // escucha a cualquier cambie en getMaxSupply
    
  
    //si no esta conectada la wallet se muestra mensaje
   // if(!active) return "Conecta tu wallet!"
    

    return(
        <>
        <p>Max Supply:{account}</p>
        {console.log("Hola ",{account})}
        </>

    ); 
};

export default Home;