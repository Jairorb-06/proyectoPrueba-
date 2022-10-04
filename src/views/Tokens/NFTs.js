import React from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useUdenarToken from "../../hooks/useUdenarToken";
import {useUdenarTokenData} from '../../hooks/useUdenarTokenData';
import { useParams } from "react-router-dom";

import { connector } from "../../config/web3";


const NFTs = () => {
    const {active, activate, account, library  } = useWeb3React();

    const [ maxSupply, setMaxSupply]= useState();
    const [ transfering, setTransfering]= useState(false);
    const [cuentaTransfer, setCuentaTransfer ]= useState("");
    const [tokenStock, setTokenStock] = useState(); 

    //const owner = "0xD73379c6FadD11e7b41927C53996BAd1Cc8f2640"; 
                // 0x28B958E9Af420ef110De857628DFA389048d7Fe0 
    //const tokenId = 0;

    const udenarToken = useUdenarToken();


     const getTokensData = useCallback(async () => {
        if (udenarToken) {
          const totalSupply = await udenarToken.methods.totalSupply().call();	
        //  inicio cálculo de Platzi punks restantes	
          const maxSupply = await udenarToken.methods.maxSupply().call();
          setMaxSupply(maxSupply)
          setTokenStock(maxSupply - totalSupply)
        //  fin cálculo de Platzi punks restantes  
        }
      }, [udenarToken]);

      useEffect(()=>{
        getTokensData();
    },[getTokensData]) 

    const {tokenId}= useParams();
    
    const {loading, NFTs, update } = useUdenarTokenData(tokenId);

    


    const Tranfer=()=>{
        setTransfering(true);
        const isAddress= library.utils.isAddress(cuentaTransfer)

        if(!isAddress){
            alert("Dirección Invalida");
            setTransfering(false);
        }else{
            console.log(udenarToken.methods);
            udenarToken.methods.safeTransferFrom(NFTs.owner, cuentaTransfer, tokenId).send({
                from:account,
                // value: 10000000000000000,
            }).on("error", (error)=>{
                setTransfering(false);
                alert("transacción fallida", error)
            })
            .on("transactionHash", (txHash)=>{
                alert(`Transacción enviada txHash: ${txHash}`)
            })
            .on("receipt", ()=>{
                setTransfering(false)
                alert(`Exito! El NFT ahora pertence a: ${cuentaTransfer}`)
            })
            update();
        }

    }

    const onChangeInput=(event)=>{
        setCuentaTransfer(event.target.value)
    }


    // mantener conexión cuando se recargue pagina

    const connect = useCallback(() => {
      activate(connector); // crea la instancia de web3 con el conector y queda listo para que library de web3 la utilice
      localStorage.setItem("previouslyConnected", "true");
    }, [activate]);

    useEffect(() => {
      if (localStorage.getItem("previouslyConnected") === "true") connect(); // hace que se conecte en automatico
    }, [connect]); // localStorage biene del navegador
  


     const atributos = NFTs.attributes

    /* atributos.forEach(function(elemento, indice){
      console.log(elemento, indice)
    }) */
    /* 
frutas.forEach(function(elemento, indice, array) {
    console.log(elemento, indice);
})
     */
    //  console.log(`Estso son los atributos ${atributos.length}`)

    if(!active) return "Conecta tu wallet!";

  return (
    <div>
        <p>maxSupply: {maxSupply}</p>
        
        <p>dueño: {NFTs.owner}</p>
        <p>TokenId: {NFTs.tokenId}</p>
        {/* <p> TokenURI: {NFTs.tokenURI}</p> */}
        <p>
          {tokenStock > 0
            ? `Quedan ${tokenStock} NFT´s por mintear!`
            : `Se agotaron los NFT´s :(`
          }
        </p>

        <img src={NFTs.image} height={250} width={250}/>
        {/* <p>Account: {account}</p> */}

        <br/>
        <p>este es otro item: {NFTs.date}</p>
{/* 
attributes
{NFTs.map(({name, image, tokenId})=>(
        <Link key={tokenId}  to={`/NFTs/${tokenId}`}>
        <div  className='container'>
            <p>{name}</p>
          <img src={image} height = {100} width={100} />
          <span>{tokenId}</span>
        </div>
        </Link>
        
        
      ))}

           */}


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
