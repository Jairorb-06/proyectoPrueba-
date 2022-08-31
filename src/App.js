import React from 'react';
import { Route } from 'react-router-dom';
import WalletData from "./Layouts/main";
import Home from "./views/home";
//import WalletData from "./wallet-data";

/* function Boton(props){
  return (
    <button onClick={props.nombre}>
      Conectar wallet
    </button>
  )
} */

function App() {
  return (
   /*  <Home></Home> */
    <WalletData>
     <Route path="/" exact component={Home}/>
    </WalletData>
  );
}

export default App;