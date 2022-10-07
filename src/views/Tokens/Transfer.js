import React, {useCallback, useEffect} from 'react'
import {Link } from 'react-router-dom'
import { useUdenarTokensData } from '../../hooks/useUdenarTokenData';
import { useWeb3React } from "@web3-react/core";

import { connector } from "../../config/web3";


const Transfer = () => {

  const { NFTs, loading} = useUdenarTokensData();

  const {activate, account, library  } = useWeb3React();
  const connect = useCallback(() => {
    activate(connector); // crea la instancia de web3 con el conector y queda listo para que library de web3 la utilice
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect(); // hace que se conecte en automatico
  }, [connect]); // localStorage biene del navegador

console.log({NFTs})

  return (

    <div>
      {NFTs.map((nft)=>(
        
        nft.owner !== "0" ? (

         <Link key={nft.tokenId}  to={`/NFTs/${nft.tokenId}`}>
         {/* {console.log(nft)} */}
       <div  className='container'>
           <p>{nft.name}</p>

         <img src={nft.image} height = {100} width={100} alt=".." />
         <span>{nft.tokenId}</span>
       </div>
       </Link>
        ):(
          console.log("nada")
        ) 
      
        
        
      ))}
      <Link to="/">
        <button type="button">Cancelar</button>
      </Link>
    </div>
   
  )
}

export default Transfer