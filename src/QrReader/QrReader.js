import React, { useState,useCallback, useEffect } from "react";
 import QrScan from '../../node_modules/react-qr-reader'
 import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import useUdenarToken from "../hooks/useUdenarToken";
import { connector } from "../config/web3";
import { searchRegister } from "../config/firebase/api";
import Swal from 'sweetalert2';

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

  const [tokenId, setTokenId] = useState("");
  const [account, setAccount] = useState("");
  const [idName, setIdName]= useState('');
  // const [ownerOff, setOwnerOff] = useState("");
  // const [idToken, setIdToken] = useState();

  


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
            setTokenId(arr[1])
            setAccount(arr[3])
            setIdName(`${arr[5]} ${arr[6]}  ${arr[8]}`)
        }
    }
    const handleError = err => {
    console.error(err)
    }
    
   //---------------------------------------------------------------------------------
  
   
    const getOwnerToken = async () => {
     if (udenarToken) {
       const ownerOff = await udenarToken.methods.ownerOf(tokenId).call();
       if (account === ownerOff) {
         console.log("Adelante Bienvenido!");
         Swal.fire(
          'Bienvenido!',
          '',
          'success'
        )
       } else {
         console.log('El NFT no te pertenece');
        Swal.fire(
          'EL NFT no te pertenece!',
          '',
          'error'
        )
       }
       //  setOwnerOff(ownerOff)
     }
  };
  /*
 useEffect(() => {
   getOwnerToken()
   }, []) */
    const getAsistentes =async ()=>{
    const estadoReg = await searchRegister(tokenId, account);
    if(estadoReg === true){
      Swal.fire(
        'Usuario',
        idName,
        'success'
      )
      // window.open(`/`, "_self")
      
    }
    if(estadoReg === false){
      Swal.fire(
        'Incorrecto',
        'Tu registro no coincide',
        'error'
      )
    }

  }
  useEffect(() => {
    getAsistentes()
    })
 
    // searchRegister(tokenId, account).then(result=>setResultado(result))

   /*  if(resultado === true){
      alert("¡Correcto, Bienvenido!")
    }
    else if(resultado ===false){
        alert("¡Tu registro es incorrecto!")
    } */
     
//  const getDate=async()=> await searchDateRegist(verifTokenId, verifAddres)
  
  return (
    <div style={modalStyles}>
     {/* {console.log(resultado ? resultado : "espera...")}  */}

        <div className="d-grid gap-2 d-md-flex justify-content-md">
        <Link to="/transfer">
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
       <button
       className="btn btn-outline-primary btn-sm"
        onClick={getOwnerToken}
        disabled={qrscan === 'No result'}
      >
        {qrscan === 'No result' ? "Escanea el Qr" : "Verificar dueño de NFT"}
        </button>
    </div>
  );
};

export default QrReader;
