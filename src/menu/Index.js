import React from "react";
import WalletData from "../Layouts/main";
import Home from "../views/mint";
import Transfer from "../views/Tokens/Transfer";
import {Link } from 'react-router-dom'

const Index = () => {
  return (
    <>
      {/* <Transfer /> */}
      
      <Link  to={`/Transfer`}>
      <button >Galeria</button>
        </Link>
      <WalletData />

      <Home />
    </>
  );
};

export default Index;
