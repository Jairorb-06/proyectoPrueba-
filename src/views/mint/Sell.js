import React, {useEffect, useCallback, useState} from 'react';
import { useParams } from "react-router-dom";

import { useWeb3React } from "@web3-react/core";

import { connector } from "../../config/web3";
import useUdenarToken from "../../hooks/useUdenarToken";
import { useImgContext, useImgToggleContext } from "../../providers/ImgProvider";
import useContract from '../../hooks/useContract';
import useGetColection from '../../config/firebase/getColection';
import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../config/firebase/Firebase";
import {db} from "../../firebase"

const Sell = () => {

    const {index}= useParams();
    const { activate, deactivate, account, library, active } = useWeb3React();

    const links = useImgContext();
  // | console.log(links);
    const update = useImgToggleContext();

    const URIS = [
      "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/1.json",
      "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/2.json",
      "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/3.json",
      "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/4.json",
      "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/5.json",
      "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/6.json",
      "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/7.json",
      "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/8.json",
      "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/9.json",
      "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/10.json",
      "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/11.json",
      "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/12.json",
    ];
  
  
    //--------------
  
    const connect = useCallback(() => {
      activate(connector);
      localStorage.setItem("previouslyConnected", "true");
    }, [activate]);
  
    const disconnect = () => {
      deactivate();
      localStorage.removeItem("previouslyConnected");
    };
    useEffect(() => {
      if (localStorage.getItem("previouslyConnected") === "true") connect();
    }, [connect]);
    //--------------
  
    const [isMinting, setIsMinting] = useState(false);

    
    // const { active, chainId, account } = useWeb3React();
    const [maxSupply, setMaxSupply] = useState();
  
    const udenarToken = useUdenarToken();

    // Get ABI db
    const dirTestToken ="0xa533ee80c221a7f6a54f5b36e03c7eafe63d50bd";

     const colArtifacts =  useGetColection(dirTestToken);
    // const { address, abi } = colec;
    // const {address, abi} = colec  

    //---------------------------------------------
  
    const getMaxSupply = useCallback(async () => {
      // validamos que el contrato exista
      if (udenarToken) {
        const result = await udenarToken.methods.maxSupply().call().then(); //console.log("Holaaa",{maxSupply}) //dentro del then
        //console.log(imagenToken.methods);
        setMaxSupply(result);
      }
    }, udenarToken); // cada que cambie elcontrato secrea esta funcion
  
    useEffect(() => {
      getMaxSupply();
    }, [getMaxSupply]); // escucha a cualquier cambie en getMaxSupply
   
    // const nums = Number(index)
    // const imgs = links.filter((link)=> link.id_img===nums+1) 

     
    const mint = () => {
      setIsMinting(true);
      udenarToken.methods
        .mint(
          `${URIS[idImg - 1]}`
          // "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/4.json"
        )
        .send({
          from: account,
           value: 10000000000000000,
        })
        .on("transactionHash", (txHash) => {
          alert(`Transacción enviada txHash: ${txHash}`);
        })
        .on("receipt", () => {
          setIsMinting(false);
          alert(`Transaccion Confirmada el NFT pertenece a ${account}`);
        })
        .on("error", (error) => {
          setIsMinting(false);
          alert(`Transacción Fallida`);
          //  update(imgs[0].id)
            // update(idDocument)
          // changeState(imgs[index]);
          new Promise(function (resolve) {
            resolve(update(idDocument));
          }).then(function (result) {
            window.open(`/`, "_self");
          });
        });
    };
  
    //si no esta conectada la wallet se muestra mensaje
    // if (!active) return "Conecta tu wallet!";
    
      //  useGetColection(dirTestToken);
    
      //---------------------------------------------------------------------------------
  const [imagen, setImagen] = useState("");
  const [idImg, setIdImg] = useState();
  const [idDocument, setIdDocument] = useState("");

  const getImage = async (index) => {
    let docC = "Images";
    

    const docRef = doc(db, `${docC}`, index);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().mint === false) {
        setImagen(docSnap.data().url);
        setIdImg(docSnap.data().id_img);
        setIdDocument(docSnap.id);
      } else {
        window.open(`/`, "_self");
      }
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getImage(index);
  }, [index]);
   
  return (
    
    <>
       <img src={imagen ? imagen: "No exists"}
            height={300}
            width={300}
            alt="NFT"
          /> 
          
          {/* <small>{imgs[0] ? imgs[0].url: "No exists"}</small> */}
          <br/> 
           {/* {console.log(imgs[0].id)} */}
          <small>{URIS[idImg-1]}</small>

            <p>Compra Tu NFT a 0.1 MATIC. </p>
            <button
              className="btn-main"
              onClick=
              //  {()=>changeState(imgs[index])}
               {mint}
              disabled={!udenarToken}
              isloading={isMinting}
            >
               {active ? "Compra NFT" : "Wallet Desconectada"}
            </button>
             
    </>
  )
}

export default Sell