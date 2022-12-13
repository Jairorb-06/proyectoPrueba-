import React from "react";
import { useCallback, useEffect, useState } from 'react';
import {  useWeb3React } from "@web3-react/core";
//import { connector } from "./config/web3"; //from "../../../config/web3";
import { connector } from "../../config/web3"; 
//import useImagenToken from "../../hooks/useUdenarToken";


const WalletData = () => {
  const [balance, setBalance] = useState(0); // variable de estado para almacenar el balance
  
  // en account esta la info de la cuenta // aqui recibimos la intancia de web3React
     const {activate, deactivate, library,  chainId, account, active}  = useWeb3React();
 
  

  //const isUnsupportedChain = error instanceof UnsupportedChainIdError;
  /* 
  const isMetamaskIstalled = ()=>{
    const {ethereum} = window
    return Boolean(ethereum && ethereum.isMetaMask)
  }
 */
  const connect = useCallback(async() => {

    if(!window.ethereum){  /* !isMetamaskIstalled() */
       alert("Yo need install MetaMask")        
          window.open('https://metamask.io/');
    }else{
      try {
       await activate(connector);
        localStorage.setItem("previouslyConnected", "true");
      } catch (error) {
        console.log(error)
      }
    }
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  const getBalance = useCallback(async () => {
    const toSet = await library.eth.getBalance(account);
    setBalance((toSet / 1e18).toFixed(2));
  }, [library?.eth, account]);

  useEffect(() => {
    if (active) getBalance();
  }, [active, getBalance]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

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
      </>
        
      ) : (
        // <button nombre={connect} />
        <button onClick={connect} type="btn">Conectar wallet</button>
      )}
    </>
  );
};
export default WalletData;
