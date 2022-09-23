import React from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useUdenarToken from "../../hooks/useUdenarToken";
import {useUdenarTokenData} from '../../hooks/useUdenarTokenData';
//import { useParams } from "react-router-dom";




const NFTs = () => {
    const {active, account, library  } = useWeb3React();
    const [ maxSupply, setMaxSupply]= useState();
    const [ transfering, setTransfering]= useState(false);
    const [cuentaTransfer, setCuentaTransfer ]= useState("");
    // const [platziPunksStock, setPlatziPunksStock] = useState(); 
    const [platziPunksStock, setPlatziPunksStock] = useState();

    //const owner = "0xD73379c6FadD11e7b41927C53996BAd1Cc8f2640"; 
                // 0x28B958E9Af420ef110De857628DFA389048d7Fe0 
     const tokenId = 0;

    const udenarToken = useUdenarToken();


    /* const getPlatziPunksData = useCallback(async () => {
        if (udenarToken) {
          const totalSupply = await udenarToken.methods.totalSupply().call();
        //  inicio cálculo de Platzi punks restantes	
          const maxSupply = await udenarToken.methods.maxSupply().call();
          setPlatziPunksStock(maxSupply - totalSupply)
        //  fin cálculo de Platzi punks restantes  
        }
      }, [udenarToken]); */


    //const {tokenId}= useParams();
    const {loading, NFTs, update } = useUdenarTokenData(tokenId);


    const Tranfer=()=>{
        setTransfering(true);
        const isAddress= library.utils.isAddress(cuentaTransfer)

        if(!isAddress){
            alert("Dirección Invalida");
            setTransfering(false);
        }else{
            //console.log(udenarToken.methods);
            udenarToken.methods.safeTransferFrom(NFTs.owner, cuentaTransfer, tokenId).send({
                from:account,
            }).on("error", (error)=>{
                setTransfering(false);
                alert("transacción fallida", error)
            })
            .on("transactionHash", (txHash)=>{
                alert(`Transacción enviada txHash: ${txHash}`)
            })
            .on("receipt", ()=>{
                setTransfering(false)
                // alert("transaccion confirmada, en NFT ahora pertence a ", cuentaTransfer)
                alert(`Exito! El NFT ahora pertence a: ${cuentaTransfer}`)
                // update()
            })
            update();
        }

    }

    const onChangeInput=(event)=>{
        setCuentaTransfer(event.target.value)
    }

    const getMaxSupply = useCallback(async()=>{
        // validamos que el contrato exista 
        if(udenarToken){
            const result = await udenarToken.methods.maxSupply().call().then();//console.log("Holaaa",{maxSupply}) //dentro del then
            //console.log(imagenToken.methods);
            setMaxSupply(result);
        } 
    },udenarToken); // cada que cambie elcontrato secrea esta funcion 
    
    useEffect(()=>{
        getMaxSupply();
    },[getMaxSupply]) // escucha a cualquier cambie en getMaxSupply 
    
    //  if(!active) return "Conecta tu wallet!"

  return (
    <div>
        <p>maxSupply: {maxSupply}</p>
        
        <p>dueño: {NFTs.owner}</p>
        <p>TokenId: {NFTs.tokenId}</p>
        <p> TokenURI: {NFTs.tokenURI}</p>
        {/* <p>Account: {account}</p> */}

        {/* <p>Total Supply: {platziPunksStock}</p> */}
        <br/>
        
        <input onChange={onChangeInput} placeholder="Cuenta a tranferir"/>
        <br/>
      <button 
      onClick={Tranfer} 
            disabled= {account !== NFTs.owner}
           
       >{account !== NFTs.owner ? "No Eres el Dueño": "Tranferir Token"}</button>
      
      <Link to="/">
        <button type="button">Cancelar</button>
      </Link>
      <br/>
      <span>{cuentaTransfer}</span>
    </div>
  );
};

export default NFTs;
