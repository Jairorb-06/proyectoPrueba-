import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUdenarTokensData } from "../../hooks/useUdenarTokenData";
import { useWeb3React } from "@web3-react/core";

import { connector } from "../../config/web3";
import useUdenarToken from "../../hooks/useUdenarToken";
import QRCode from "react-qr-code";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
const Transfer = () => {
  const { activate, account, library } = useWeb3React();

  const { NFTs, loading } = useUdenarTokensData({
    owner: account,
  });
 
  
  const connect = useCallback(() => {
    activate(connector); // crea la instancia de web3 con el conector y queda listo para que library de web3 la utilice
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect(); // hace que se conecte en automatico
  }, [connect]); // localStorage biene del navegador

  // console.log({NFTs})

  const udenarToken = useUdenarToken();

  const [verifTokenId, setVerifTokenId] = useState("");
  const [verifAddres, setVerifAddres] = useState("");
  const [ownerOff, setOwnerOff] = useState("");
  const [idToken, setIdToken] = useState();

  // const totalSupply = await udenarToken.methods.totalSupply().call();

  const onChangeInputT = (event) => {
    
    setVerifTokenId(event.target.value);
  };
  const onChangeInputA = (event) => {
    setVerifAddres(event.target.value);
  };
   const getOwnerToken = async () => {
    if (udenarToken) {
      const ownerOff = await udenarToken.methods.ownerOf(verifTokenId).call();
      if (verifAddres === ownerOff) {
        setOwnerOff("Adelante Bienvenido!");
      } else {
        setOwnerOff("EL NFT no te pertenece!!");
      }

      //  setOwnerOff(ownerOff)
    }
  }; 
 
  

  //------------------------------------------------------------------------------------

  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const [openModal, setOpenModal] = useState(false);
  const OpenModal = (tokenId) => {
    setOpenModal(!openModal);
    setIdToken(tokenId);
  };
  const ModalQR = ({ estado, cambiarEstado }) => {
   /* const tokenURI = {
       "0xa5349dabf173729fb1bd774b439aa3ab91234388": [
         "https://gateway.pinata.cloud/ipfs/QmXXZmQgCqnE55mQz8b6ykjZQosBfA7J2QQx7LatgMWwh1/1.json"
       ]
     } */
    return (
      <>
        {estado && (
          <Modal isOpen={estado} style={modalStyles}>
            <ModalHeader>
              QR Code &nbsp; &nbsp; &nbsp;
              <button
                type="button"
                className="btn-close"
                onClick={() => cambiarEstado(false)}
              ></button>
            </ModalHeader>
            <ModalBody>
              
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                   value={`TokenId: ${idToken} \n Cuenta: ${account}`}
                  // value={tokenURI}
                  viewBox={`0 0 256 256`}
                />
            </ModalBody>
          </Modal>
        )}
      </>
    );
  };
  return (
    <div>
      <input onChange={onChangeInputT} placeholder="Token Id" />
      <br />
      <input onChange={onChangeInputA} placeholder="Ingresa tu billetera" />
      <br />
      <button onClick={getOwnerToken}>Verificar</button>
      <h4> {ownerOff}</h4>
      {console.log(NFTs)}
      {NFTs && NFTs.map((nft) =>
        nft.owner !== "0" ? (
          <div key={nft.tokenId} className="">
            <Link to={`/NFTs/${nft.tokenId}`}>
              {/* {console.log(nft)} */}
              <div className="container">
                <p>{nft.name}</p>

                <img src={nft.image} height={210} width={210} alt=".." />
                <span>{nft.tokenId}</span>
                {/* {setIdToken(nft.tokenId)} */}
              </div>
            </Link>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <button className="btn" onClick={() => OpenModal(nft.tokenId)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-qr-code"
                viewBox="0 0 16 16"
              >
                <path d="M2 2h2v2H2V2Z" />
                <path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z" />
                <path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z" />
                <path d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z" />
                <path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z" />
              </svg>
            </button>
          </div>
        ) : (
          console.log("nada")
        )
      )}
      <ModalQR estado={openModal} cambiarEstado={setOpenModal} />

      <Link to="/">
        <button type="button" onClick={() => window.open(`/`, "_self")}>
          Cancelar
        </button>
      </Link>
    </div>
  );
};

export default Transfer;
