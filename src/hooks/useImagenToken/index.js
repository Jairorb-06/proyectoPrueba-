import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import ImagenTokenArtifacts from "../../config/web3/artifacts/ImagenToken";

// hook para uso de nuestro contrato inteligente 
const { address, abi } = ImagenTokenArtifacts; // sacamos de artifacts el address y el abi
const useImagenToken =()=>{
    const {active, library, chainId}=useWeb3React();
    

    // creamos un nuevo objeto
    const imagenToken = useMemo(()=> {
                              // web3.eth.Contract
        if(active) return new library.eth.Contract(abi, address[chainId] // instanciamos el contratodependiendo de la red en que nos encontramos
    )},[active, chainId, library?.eth?.Contract])

    return imagenToken; 
}
export default useImagenToken;