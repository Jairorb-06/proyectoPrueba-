import { searchRegister, searchIdName } from '../config/firebase/api';
import React, {useEffect, useState } from 'react';
import QRCode from "react-qr-code";

const QrGenerator = ({_tokenId, _account, setFoundRegist, setLoadingQr}) => {

    // const [foundRegist, setFoundRegist]=useState(false)
    // const [name, setName ]= useState('')
    // const [identification, setIdentification ]= useState('')
    const [value, setValue]=useState('')

    const getAsistentes = async ()=>{
        const estadoReg = await searchRegister(_tokenId, _account);
        setFoundRegist(estadoReg);
      }
      
      const getIdName= async()=>{
          setLoadingQr(true)
          const {identification, name} = await searchIdName(_tokenId, _account);
          // setIdentification(identification) 
          // setName(name)
          setValue(`tokenId: ${_tokenId} \ncuenta: ${_account} \nname: ${name} \nidentification: ${identification}`)
          setLoadingQr(false)
        }

       useEffect(()=>{
           getAsistentes();
           getIdName();
      },[])
  return (
    <div>
        <QRCode
            size={150}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={value}
            viewBox={`0 0 256 256`}
            /> 
    </div>
  )
}
export default QrGenerator