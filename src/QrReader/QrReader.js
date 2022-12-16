import React, { useState,useCallback, useEffect } from "react";
 import QrScan from '../../node_modules/react-qr-reader'
 import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import useUdenarToken from "../hooks/useUdenarToken";
import { connector } from "../config/web3";
// import QrScan from 'react-qr-reader';
// import { QrReader } from 'react-qr-reader';

const QrReader = () => {
  const { activate } = useWeb3React()    
    const connect = useCallback(() => {
      activate(connector); // crea la instancia de web3 con el conector y queda listo para que library de web3 la utilice
      localStorage.setItem("previouslyConnected", "true");
    }, [activate]);
 
    useEffect(() => {
      if (localStorage.getItem("previouslyConnected") === "true") connect(); // hace que se conecte en automatico
    }, [connect]); // localStorage biene del navegador
  const udenarToken = useUdenarToken()

  const [verifTokenId, setVerifTokenId] = useState("");
  const [verifAddres, setVerifAddres] = useState("");
  const [ownerOff, setOwnerOff] = useState("");
  const [idToken, setIdToken] = useState();


    const modalStyles = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
      const [qrscan, setQrscan] = useState('No result');
    const handleScan = data => {
        if (data) {
            setQrscan(data)
            let arr = data.split(' ');
            setVerifTokenId(arr[1])
            setVerifAddres(arr[4])
            // ['TokenId:', '4', '\n', 'Cuenta:', '0xD7544D9100aC97aF9E5193ED5f275Ac8bAC75cc9']
        }
    }
    const handleError = err => {
    console.error(err)
    }
    
   //---------------------------------------------------------------------------------
  
   
   const getOwnerToken = async () => {
     console.log("address", verifTokenId, verifAddres)
     if (udenarToken) {
       const ownerOff = await udenarToken.methods.ownerOf(verifTokenId).call();
       if (verifAddres === ownerOff) {
         console.log("Adelante Bienvenido!");
       } else {
         console.log("EL NFT no te pertenece!!");
       }
       //  setOwnerOff(ownerOff)
     }
  };
 useEffect(() => {
   getOwnerToken()
   }, [])
 
   
  return (
    <div style={modalStyles}>
        <div className="d-grid gap-2 d-md-flex justify-content-md">
        <Link to="/">
            <button className="btn btn-outline-primary btn-sm" type="button">Regresar</button>
        </Link>
        </div>
      <h1>QR Scanner</h1>
       <div style={{ marginTop:30}}>               
                 
                 <QrScan
                    delay={300}                    
                    onError={handleError}
                    onScan={handleScan}
                    style={{ height: 240, width: 320 }}

                    
                /> 
            </div>            
      <textarea className="form-control"  rows="4"
      style={{fontSize:18, width:340, height:100, marginTop:100}}
       defaultValue={qrscan}
       value={qrscan}
      /> 
      {/* <button onClick={getOwnerToken}>Verificar</button> */}
    </div>
  );
};

export default QrReader;
