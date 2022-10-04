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



  return (

    

    <div className='container-fluid cew-9'>
      {NFTs.map(({name, image, tokenId})=>(
        <Link key={tokenId}  to={`/NFTs/${tokenId}`}>
        <div  className='container'>
            <p>{name}</p>
          <img src={image} height = {100} width={100} />
          <span>{tokenId}</span>
        </div>
        </Link>
        
        
      ))}
      <Link to="/">
        <button type="button">Cancelar</button>
      </Link>
    </div>
   
  )
}

export default Transfer