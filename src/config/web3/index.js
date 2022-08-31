import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector"; // para configurar el conector 

const connector = new InjectedConnector({  // este lo exportamos como conector en el export
  supportedChainIds: [
    4, // Rinkeby
  ],
});

const getLibrary = (provider) => {
  return new Web3(provider); // retorna una nueva instancia de web3 con el provider
  
};


export { connector, getLibrary };


