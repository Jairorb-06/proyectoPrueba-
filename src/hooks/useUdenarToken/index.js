import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import UdenarTokenArtifacts from '../../config/web3/artifacts/UdenarToken'
//import ImagenTokenArtifacts from "../../config/web3/artifacts/UdenarToken";

// hook para uso de nuestro contrato inteligente 
const { address, abi } = UdenarTokenArtifacts; // sacamos de artifacts el address y el abi
const useUdenarToken =()=>{
    const {active, library, chainId}=useWeb3React();

    // creamos un nuevo objeto
    const udenarToken = useMemo(()=> {
                              // web3.eth.Contract
        if(active) return new library.eth.Contract(abi, address[chainId] // instanciamos el contrato dependiendo de la red en que nos encontramos
    )},[active, chainId, library?.eth?.Contract])

    return udenarToken;
}
export default useUdenarToken;