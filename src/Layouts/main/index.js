import React from "react";
import { useCallback, useEffect, useState } from 'react';
import { getWeb3ReactContext, UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
//import { connector } from "./config/web3"; //from "../../../config/web3";
import { connector } from "../../config/web3"; 
//import useImagenToken from "../../hooks/useUdenarToken";
import useUdenarToken from "../../hooks/useUdenarToken";


function Boton(props){
    return (
      <button onClick={props.nombre}>
        Conectar wallet
      </button>
    )
  }

const WalletData = () => {
  const [balance, setBalance] = useState(0); // variable de estado para almacenar el balance
  const {
    active,
    activate,
    deactivate,
    account,
    error,
    chainId,
    library,
    
  } = useWeb3React(); // en account esta la info de la cuenta // aqui recibimos la intancia de web3React

  const [ maxSupply, setMaxSupply]= useState();

  const udenarToken = useUdenarToken();

  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const connect = useCallback(() => {
    activate(connector); // crea la instancia de web3 con el conector y queda listo para que library de web3 la utilice
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  const disconnect = () => {
    deactivate(); // desac
    localStorage.removeItem("previouslyConnected"); // remueve la conexion
  };
  const getBalance = useCallback(async () => {
    // efecto para obtener el balance de la cuenta y se muestre en la informacion de wallet
    const toSet = await library.eth.getBalance(account);
    setBalance((toSet / 1e18).toFixed(3)); //guarda 3 decimales
  }, [library?.eth, account]);

  useEffect(() => {
    if (active) getBalance();
  }, [active, getBalance]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect(); // hace que se conecte en automatico
  }, [connect]); // localStorage biene del navegador

  return (
    <>
      {active ? (
        <>
          <p>{account}</p>
          <button onClick={disconnect}>Desconectar</button>
          

          <p>
           Tu estas conectado a network con ID: {chainId} <br/>
           tu saldo es {balance} ethers
         </p>
      
        {/* <img src={" https://gateway.pinata.cloud/ipfs/QmQSRDzKH2JFM7qu5ZWDGvQrJ7EsZDoc1WQ8UmBMnr7D2q"}></img> */}
       
          
      </>
        
      ) : (
        <Boton nombre={connect} />
      )}
    </>
  );
};
export default WalletData;
