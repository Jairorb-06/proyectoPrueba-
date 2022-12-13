import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

const useContract =(colection)=>{
    const { address, abi } = colection;
    const {active, library, chainId}=useWeb3React();

    // creamos un nuevo objeto
    const collection = useMemo(()=> {
                              // web3.eth.Contract
        if(active) return new library.eth.Contract(abi, address[chainId] // instanciamos el contrato dependiendo de la red en que nos encontramos
    )},[active, chainId, library?.eth?.Contract])
       

    return collection;
}
export default useContract;
