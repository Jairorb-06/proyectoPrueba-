import React from "react";
import WalletData from "../Layouts/main";
import Home from "../views/mint";

import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>

      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">

        {/* <button className="collapse" id="navbarToggleExternalContent" type="button" data-bs-toggle="collapse" data-bs-target="#opciones">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        {/* <div className="collapse navbar-collapse" id="opciones"> */}
        <ul className="navbar-nav">
          {/* <li className='nav-item'>
            <a className="nav-link" href="/">Udenar</a>  
          </li>
          <li className='nav-item'>
          <a className="nav-link active" aria-current="page" href="/">Home</a>  
          </li> */}
          <li className='nav-item'>
          <a className="nav-link active" href="/transfer">Galeria</a>
          </li>
          <li className='nav-item'>
          <a className="nav-link active" href="qr_reader">Qr Reader</a>  
          </li>
        </ul>
        {/* </div> */}
      </nav>

      {/* <Transfer /> */}

      {/* <button  onClick={() =>
                  window.open(`/transfer`, "_self")
                } >Galeria</button>
      <button>heyy you</button>  */}
        <WalletData /> 
       {/* <div>
         <img src="https://p4.wallpaperbetter.com/wallpaper/762/60/929/abstract-artistic-qr-code-space-wallpaper-preview.jpg" 
            alt="--" 
            height= '100%'
            width= "100%"/>
       </div> */}
      {/* <Home /> */}
    </div>
  );
};

export default Index;
