import React, { useContext, useState, useEffect } from 'react'


const imageContext = React.createContext();
const imageToggleContext = React.createContext();
export function useImageContext(){
    return useContext(imageContext);
}
export function useImageToggleContext(){
    return useContext(imageToggleContext);
}

const ImageProvider = (props) => {

    const IMAGES = [
        // "https://gateway.pinata.cloud/ipfs/QmVNL4eqnDqhku8bJVjx7zAnriZXxeZgU2nKKX3xd4VxHw",
        "https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/1.jpg",
        "https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/2.jpg",
        "https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/3.jpg",
        "https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/4.jpg",
        "https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/5.jpg",
        "https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/6.jpg",
        "https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/7.jpg",
        "https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/8.jpg",
        "https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/9.jpg",
        "https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/10.jpg",
        "https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/11.jpg",
        "https://gateway.pinata.cloud/ipfs/QmNud6BNfMEesmhfiwi22HtGmsGJeU7rLVhaWQU24dhXJE/12.jpg",
      ];
      // copia arreglo
    
      const nuevo = IMAGES.map((img) => {
        return { img, state: true };
      });
    
      //console.log(nuevo);
    
      const [imagens, setImagens] = useState(nuevo);

      
      useEffect(()=>{
        let data = localStorage.getItem('images');
        if(data !== null){
          setImagens(JSON.parse(data))
        }else{
          setImagens(nuevo)
        }
      },[])
      
      useEffect(()=>{
        localStorage.setItem('images', JSON.stringify(imagens))
      }, [setImagens])
      
      const changeState= imagen =>{
        setImagens(imagens.map(i=>(i.img === imagen.img ? {...i, state: false} : i )));
      }
  return (
    <imageContext.Provider value={imagens} >
        <imageToggleContext.Provider value={changeState}>
            {props.children}
        </imageToggleContext.Provider>
    </imageContext.Provider>
  )
}

export default ImageProvider