import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useUdenarToken from "../../hooks/useUdenarToken";

const Home = ()=>{
    
    const [ isMinting, setIsMinting]=useState(false);
    const {active, chainId, account  } = useWeb3React();
    const [ maxSupply, setMaxSupply]= useState();

    const udenarToken = useUdenarToken();

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
    

    const mint=()=>{
        setIsMinting(true);
        udenarToken.methods.mint("https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/1.json").send({
            from:account,
            value: 10000000000000000
        }).on("transactionHash", (txHash)=>{
            alert(`Transacción enviada txHash: ${txHash}`)
        })
        .on("receipt", ()=>{
            setIsMinting(false);
            alert(`Transaccion Confirmada el NFT pertenece a ${account}`)
        })
        .on("error", (error)=>{
            setIsMinting(false);
            alert(`Transacción Fallida`)
        })
        
    }
  
    const IMAGES=[
        'https://gateway.pinata.cloud/ipfs/QmVNL4eqnDqhku8bJVjx7zAnriZXxeZgU2nKKX3xd4VxHw',
        'https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/1.jpg',
        'https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/2.jpg',
        'https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/3.jpg',
        'https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/4.jpg',
        'https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/5.jpg',
        'https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/6.jpg',
        'https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/7.jpg',
        'https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/8.jpg',
        'https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/9.jpg',
        'https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/10.jpg',
        'https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/11.jpg',
        'https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/12.jpg',
    ]
    const URIS=[
        'https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/1.json',
        'https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/2.json',
        'https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/3.json',
        'https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/4.json',
        'https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/5.json',
        'https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/6.json',
        'https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/7.json',
        'https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/8.json',
        'https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/9.json',
        'https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/10.json',
        'https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/11.json',
        'https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/11.json',
    ]

    //si no esta conectada la wallet se muestra mensaje
    if(!active) return "Conecta tu wallet!"
    
    return(
        <>        
        {IMAGES.map((img, index)=>
        <>
        <img key={index} src={img} width="300" height="300"/>
        <button onClick={mint}
            disabled={!udenarToken}
            isloading={isMinting}
         >ObtenerToken</button>
          
        </>
               
        )
        }
        </>
    ); 
};

export default Home;
